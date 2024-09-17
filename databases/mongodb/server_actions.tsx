"use server"
import {
  WalletModel,
  TransactionModel,
  CategoryModel,
  ICategory,
} from "./models"
import { auth } from "@/auth"
import connectDB from "./db.connect"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
//import { redirect } from "next/navigation"

//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null
  error: string | null
}

const newCategory = (input: string): string | false => {
  const regex = /^NEW_CATEGORY=([^_]+)_/
  const match = input.match(regex)
  return match ? match[1] : false
}

//-----------------------------------------------------------------------------

const getWallets = async (): Promise<any> => {
  try {
    await connectDB()
    const session = await auth()
    const user = session?.user?.email as string
    const wallets = await WalletModel.find({ user }).sort({ createdAt: -1 })

    return wallets
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const getWallet = async (): Promise<any> => {
  try {
    await connectDB()
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""
    const wallet = await WalletModel.findById(id)
    return wallet
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const createWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    const session = await auth()
    await connectDB()
    const title = formData.get("title") as string
    const user = session?.user?.email as string

    const wallet = new WalletModel({ title, user })
    await wallet.save()
    revalidatePath(`/`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Wallet ${title} created successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    if (error.code === 11000) {
      return {
        success: null,
        error: "Wallet with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const editWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    await connectDB()
    const title = formData.get("title") as string
    const id = formData.get("id") as string
    const payload = { title }
    //throw new Error("test error"); // Simulate error
    await WalletModel.findOneAndUpdate({ _id: id }, payload)
    revalidatePath(`/wallet/${id}`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Wallet updated successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    if (error.code === 11000) {
      return {
        success: null,
        error: "Wallet with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const deleteWallet = async (): Promise<IActionState> => {
  try {
    await connectDB()
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const wallet_id = segments[2] || ""
    //throw new Error("test error"); // Simulate error
    await TransactionModel.deleteMany({ wallet_id })
    await WalletModel.findOneAndDelete({ _id: wallet_id })
    revalidatePath(`/`, "page")
    return { success: `Wallet deleted successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const getCategories = async (): Promise<any> => {
  try {
    await connectDB()
    const session = await auth()
    const user = session?.user?.email as string
    const categories = await CategoryModel.find({ user }).select("title id")
    //throw new Error("test error"); // Simulate error
    return categories
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const getCategory = async (id: string): Promise<any> => {
  try {
    await connectDB()
    const category = await CategoryModel.findById(id)
    return category
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

export interface IWalletCategoryStat {
  title: string
  amount: number
}

const getWalletCategoriesStats = async (): Promise<IWalletCategoryStat[]> => {
  try {
    await connectDB()
    const session = await auth()
    const user = session?.user?.email as string
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const wallet_id = segments[2] || ""
    //----------------------------------------------
    const categories = await CategoryModel.find({ user })
    const transactions = await TransactionModel.find({
      wallet_id,
      type: "expense",
    })
    //there are no transactions with type expense
    if (!transactions.length) return []
    const categoriesInExpenses = transactions.reduce((acc, transaction) => {
      const category = categories.find(
        (category) =>
          category._id.toString() === transaction.category_id.toString()
      )

      // Check if category is already in the accumulator by its _id
      if (
        category &&
        !acc.some((c: any) => c._id.toString() === category._id.toString())
      ) {
        acc.push(category)
      }

      return acc
    }, [] as ICategory[])

    //----------------------------------------------

    const stats = categoriesInExpenses.map((category: ICategory) => {
      const transactionsByCategory = transactions.filter(
        (transaction) =>
          transaction.category_id.toString() === category.id.toString()
      )
      const amount = transactionsByCategory.reduce((acc, transaction) => {
        if (transaction.type === "expense") {
          acc -= transaction.amount
        } else {
          acc += transaction.amount
        }
        return acc
      }, 0)
      return {
        title: category.title,
        amount: Math.abs(amount), //return the positive value
      }
    })

    return stats
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const addCategory = async (formData: FormData): Promise<IActionState> => {
  try {
    await connectDB()
    const session = await auth()
    const title = formData.get("title") as string
    const user = session?.user?.email as string

    const category = new CategoryModel({ title, user })
    await category.save()
    revalidatePath(`/`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Category ${title} created successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    if (error.code === 11000) {
      return {
        success: null,
        error: "Category with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const getTransactions = async (): Promise<any> => {
  try {
    await connectDB()
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const wallet_id = segments[2] || ""
    const transactions = await TransactionModel.find({ wallet_id }).sort({
      date: -1,
    })
    return transactions
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const getTransaction = async (id: string): Promise<any> => {
  try {
    const transaction = await TransactionModel.findOne({ _id: id })
    return transaction
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const createTransaction = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    await connectDB()
    const session = await auth()
    const description = formData.get("description") as string
    const amount = formData.get("amount") as string
    const date = formData.get("date") as string
    const user = session?.user?.email as string
    const type = formData.get("type") as string
    const wallet_id = formData.get("wallet_id") as string
    let category_id = formData.get("category_id") as string

    //determine if a new category flag was added from the form
    //NEW_CATEGORY=sometitle_7458TYH87
    const isNewCategory = newCategory(category_id)

    if (isNewCategory) {
      const title = isNewCategory
      const category = new CategoryModel({ title, user })
      await category.save()
      category_id = category.id
    }

    const payload = {
      wallet_id: wallet_id,
      category_id: category_id,
      type,
      amount,
      date,
      description,
    }

    const transaction = new TransactionModel(payload)
    await transaction.save()
    revalidatePath(`/wallet/${wallet_id}`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Transaction created successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    if (error.code === 11000) {
      return {
        success: null,
        error: "Category with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const editTransaction = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    await connectDB()
    const session = await auth()
    const description = formData.get("description") as string
    const amount = formData.get("amount") as string
    const date = formData.get("date") as string
    const user = session?.user?.email as string
    const type = formData.get("type") as string
    const wallet_id = formData.get("wallet_id") as string
    let category_id = formData.get("category_id") as string
    const id = formData.get("id") as string

    //determine if a new category flag was added from the form
    //NEW_CATEGORY=sometitle_7458TYH87
    const isNewCategory = newCategory(category_id)

    if (isNewCategory) {
      const title = isNewCategory
      const category = new CategoryModel({ title, user })
      await category.save()
      category_id = category.id
    }

    const payload = {
      wallet_id: wallet_id,
      category_id: category_id,
      type,
      amount,
      date,
      description,
    }
    //throw new Error("test error"); // Simulate error
    await TransactionModel.findOneAndUpdate({ _id: id }, payload)
    revalidatePath(`/transaction/${id}`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Transaction updated successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const deleteTransaction = async (): Promise<IActionState> => {
  try {
    await connectDB()
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""
    //throw new Error("test error") // Simulate error
    await TransactionModel.findOneAndDelete({ _id: id })
    revalidatePath(`/transaction/${id}`, "page")
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network

    return { success: `Transaction deleted successfully`, error: null }
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" }
  }
}

export {
  getWallets,
  getWallet,
  createWallet,
  editWallet,
  deleteWallet,
  getCategories,
  getCategory,
  getWalletCategoriesStats,
  getTransactions,
  getTransaction,
  createTransaction,
  editTransaction,
  deleteTransaction,
}

//------------------------------------------------------------------------------
