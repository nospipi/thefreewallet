"use server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import prisma from "./db"

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

export type Transaction = {
  id: string
  wallet_id: string
  category_id: string
  amount: number
  type: string
  date: string
  description: string
}

export const updateWallet = async (
  action: "save" | "delete" | "update",
  prevTransaction: Transaction,
  updatedTransaction?: Transaction
): Promise<void> => {
  const wallet = await prisma.wallet.findUnique({
    where: { id: prevTransaction.wallet_id },
  })

  if (!wallet) {
    throw new Error("Wallet not found")
  }

  if (action === "save") {
    if (prevTransaction.type === "expense") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          expenses_transactions_count: { increment: 1 },
          transactions_count: { increment: 1 },
          balance: { decrement: prevTransaction.amount },
          expenses: { increment: prevTransaction.amount },
        },
      })
    } else if (prevTransaction.type === "income") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          income_transactions_count: { increment: 1 },
          transactions_count: { increment: 1 },
          balance: { increment: prevTransaction.amount },
          income: { increment: prevTransaction.amount },
        },
      })
    }
  }

  if (action === "update") {
    // Reverse the old transaction
    if (prevTransaction.type === "expense") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: prevTransaction.amount },
          expenses: { decrement: prevTransaction.amount },
          expenses_transactions_count: { decrement: 1 },
        },
      })
    } else if (prevTransaction.type === "income") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: prevTransaction.amount },
          income: { decrement: prevTransaction.amount },
          income_transactions_count: { decrement: 1 },
        },
      })
    }

    // Apply the updated transaction
    if (updatedTransaction?.type === "expense") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: updatedTransaction.amount },
          expenses: { increment: updatedTransaction.amount },
          expenses_transactions_count: { increment: 1 },
        },
      })
    } else if (updatedTransaction?.type === "income") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: updatedTransaction.amount },
          income: { increment: updatedTransaction.amount },
          income_transactions_count: { increment: 1 },
        },
      })
    }
  }

  if (action === "delete") {
    if (prevTransaction.type === "expense") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: prevTransaction.amount },
          expenses: { decrement: prevTransaction.amount },
          expenses_transactions_count: { decrement: 1 },
          transactions_count: { decrement: 1 },
        },
      })
    } else if (prevTransaction.type === "income") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: prevTransaction.amount },
          income: { decrement: prevTransaction.amount },
          income_transactions_count: { decrement: 1 },
          transactions_count: { decrement: 1 },
        },
      })
    }
  }
}

//------------------------------------------------------------------------------

const getWallets = async (): Promise<any> => {
  const session = await auth()
  const user = session?.user?.email as string

  try {
    const res = await prisma.wallet.findMany({
      where: {
        user: user,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const getWallet = async (): Promise<any> => {
  try {
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""

    const res = await prisma.wallet.findUnique({
      where: {
        id: id,
      },
    })

    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const createWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    // Assume `auth()` returns a session object with user details
    const session = await auth()
    const title = formData.get("title") as string
    const user = session?.user?.email as string

    // Insert the new wallet into the database
    await prisma.wallet.create({
      data: {
        title: title,
        user: user,
      },
    })

    revalidatePath(`/`, "page")

    // Simulate slow network or other processing if needed
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Successful response
    return { success: `Wallet ${title} created successfully`, error: null }
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique violation code in PostgreSQL
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
    const session = await auth()
    const title = formData.get("title") as string
    const user = session?.user?.email as string
    const id = formData.get("id") as string

    await prisma.wallet.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    })

    revalidatePath(`/wallet/${id}`, "page")

    return { success: `Wallet updated successfully`, error: null }
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique violation code in PostgreSQL
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
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""

    await prisma.wallet.delete({
      where: {
        id: id,
      },
    })

    revalidatePath(`/`, "page")

    return { success: `Wallet deleted successfully`, error: null }
  } catch (error: any) {
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const getCategories = async (): Promise<any> => {
  try {
    const session = await auth()
    const user = session?.user?.email as string

    const res = await prisma.category.findMany({
      where: {
        user: user,
      },
    })

    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

// const getCategory = async (id: string): Promise<any> => {
//   try {
//     await connectDB()
//     const category = await CategoryModel.findById(id)
//     return category
//   } catch (error: any) {
//     return error?.message || "An error occurred"
//   }
// }

const getCategory = async (id: string): Promise<any> => {
  try {
    const res = await prisma.category.findUnique({
      where: {
        id: id,
      },
    })

    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

export interface IWalletCategoryStat {
  title: string
  amount: number
}

const getWalletCategoriesStats = async (): Promise<IWalletCategoryStat[]> => {
  return [
    {
      title: "SUPER MARKET",
      amount: 100,
    },
    {
      title: "UTILITIES",
      amount: 50,
    },
  ]
}

const addCategory = async (formData: FormData): Promise<IActionState> => {
  try {
    const session = await auth()
    const title = formData.get("title") as string
    const user = session?.user?.email as string

    await prisma.category.create({
      data: {
        title: title,
        user: user,
      },
    })

    revalidatePath(`/`, "page")
    return { success: `Category ${title} created successfully`, error: null }
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique violation code in PostgreSQL
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
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const wallet_id = segments[2] || ""

    const res = await prisma.transaction.findMany({
      where: {
        wallet_id: wallet_id,
      },
      orderBy: {
        date: "desc",
      },
    })

    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const getTransaction = async (id: string): Promise<any> => {
  try {
    const res = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
    })
    return res
  } catch (error: any) {
    return error?.message || "An error occurred"
  }
}

const createTransaction = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
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
      const category = await prisma.category.create({
        data: {
          title: title,
          user: user,
        },
      })
      category_id = category.id
    }

    const payload = {
      wallet_id: wallet_id,
      category_id: category_id,
      type,
      amount: parseFloat(amount),
      date,
      description,
    }

    await prisma.transaction.create({
      data: payload,
    })

    revalidatePath(`/wallet/${wallet_id}`, "page")
    return { success: `Transaction created successfully`, error: null }
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique violation code in PostgreSQL
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
      const category = await prisma.category.create({
        data: {
          title: title,
          user: user,
        },
      })
      category_id = category.id
    }

    const payload = {
      wallet_id: wallet_id,
      category_id: category_id,
      type,
      amount: parseFloat(amount),
      date,
      description,
    }

    await prisma.transaction.update({
      where: {
        id: id,
      },
      data: payload,
    })

    revalidatePath(`/transaction/${id}`, "page")
    return { success: `Transaction updated successfully`, error: null }
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique violation code in PostgreSQL
      return {
        success: null,
        error: "Category with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

const deleteTransaction = async (): Promise<IActionState> => {
  try {
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""

    await prisma.transaction.delete({
      where: {
        id: id,
      },
    })

    revalidatePath(`/transaction/${id}`, "page")

    return { success: `Transaction deleted successfully`, error: null }
  } catch (error: any) {
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
