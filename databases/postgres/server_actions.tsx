"use server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import prisma from "./db"
import { nanoid } from "nanoid"

const createUniqueId = async () => {
  return nanoid(20)
}
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
    console.log("id", id)

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

//MONGO
// const addCategory = async (formData: FormData): Promise<IActionState> => {
//   try {
//     await connectDB()
//     const session = await auth()
//     const title = formData.get("title") as string
//     const user = session?.user?.email as string

//     const category = new CategoryModel({ title, user })
//     await category.save()
//     revalidatePath(`/`, "page")
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: `Category ${title} created successfully`, error: null }
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     if (error.code === 11000) {
//       return {
//         success: null,
//         error: "Category with that title already exists",
//       }
//     }
//     return { success: null, error: error?.message || "An error occurred" }
//   }
// }

//POSTGRES
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

//MONGO
// const getTransactions = async (): Promise<any> => {
//   try {
//     await connectDB()
//     const headerList = headers()
//     const pathname = headerList.get("x-current-path")
//     const segments = pathname?.split("/") || []
//     const wallet_id = segments[2] || ""
//     const transactions = await TransactionModel.find({ wallet_id }).sort({
//       date: -1,
//     })
//     return transactions
//   } catch (error: any) {
//     return error?.message || "An error occurred"
//   }
// }

//POSTGRES
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

//MONGO
// const getTransaction = async (): Promise<any> => {
//   try {
//     await connectDB()
//     const headerList = headers()
//     const pathname = headerList.get("x-current-path")
//     const segments = pathname?.split("/") || []
//     const id = segments[2] || ""
//     const transaction = await TransactionModel.findOne({ _id: id })
//     return transaction
//   } catch (error: any) {
//     return error?.message || "An error occurred"
//   }
// }

//POSTGRES
const getTransaction = async (): Promise<any> => {
  try {
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""

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

//MONGO
// const createTransaction = async (
//   previousState: IActionState,
//   formData: FormData
// ): Promise<IActionState> => {
//   try {
//     await connectDB()
//     const session = await auth()
//     const description = formData.get("description") as string
//     const amount = formData.get("amount") as string
//     const date = formData.get("date") as string
//     const user = session?.user?.email as string
//     const type = formData.get("type") as string
//     const wallet_id = formData.get("wallet_id") as string
//     let category_id = formData.get("category_id") as string

//     //determine if a new category flag was added from the form
//     //NEW_CATEGORY=sometitle_7458TYH87
//     const isNewCategory = newCategory(category_id)

//     if (isNewCategory) {
//       const title = isNewCategory
//       const category = new CategoryModel({ title, user })
//       await category.save()
//       category_id = category._id
//     }

//     const payload = {
//       wallet_id: wallet_id,
//       category_id: category_id,
//       type,
//       amount,
//       date,
//       description,
//     }

//     const transaction = new TransactionModel(payload)
//     await transaction.save()
//     revalidatePath(`/wallet/${wallet_id}`, "page")
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: `Transaction created successfully`, error: null }
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     if (error.code === 11000) {
//       return {
//         success: null,
//         error: "Category with that title already exists",
//       }
//     }
//     return { success: null, error: error?.message || "An error occurred" }
//   }
// }

//POSTGRES
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
      amount,
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

//MONGO
// const editTransaction = async (
//   previousState: IActionState,
//   formData: FormData
// ): Promise<IActionState> => {
//   try {
//     await connectDB()
//     const session = await auth()
//     const description = formData.get("description") as string
//     const amount = formData.get("amount") as string
//     const date = formData.get("date") as string
//     const user = session?.user?.email as string
//     const type = formData.get("type") as string
//     const wallet_id = formData.get("wallet_id") as string
//     let category_id = formData.get("category_id") as string
//     const id = formData.get("id") as string

//     //determine if a new category flag was added from the form
//     //NEW_CATEGORY=sometitle_7458TYH87
//     const isNewCategory = newCategory(category_id)

//     if (isNewCategory) {
//       const title = isNewCategory
//       const category = new CategoryModel({ title, user })
//       await category.save()
//       category_id = category._id
//     }

//     const payload = {
//       wallet_id: wallet_id,
//       category_id: category_id,
//       type,
//       amount,
//       date,
//       description,
//     }
//     //throw new Error("test error"); // Simulate error
//     await TransactionModel.findOneAndUpdate({ _id: id }, payload)
//     revalidatePath(`/transaction/${id}`, "page")
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: `Transaction updated successfully`, error: null }
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: null, error: error?.message || "An error occurred" }
//   }
// }

//POSTGRES
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
      amount,
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

//MONGO

// const deleteTransaction = async (): Promise<IActionState> => {
//   try {
//     await connectDB()
//     const headerList = headers()
//     const pathname = headerList.get("x-current-path")
//     const segments = pathname?.split("/") || []
//     const id = segments[2] || ""
//     //throw new Error("test error") // Simulate error
//     await TransactionModel.findOneAndDelete({ _id: id })
//     revalidatePath(`/transaction/${id}`, "page")
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network

//     return { success: `Transaction deleted successfully`, error: null }
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: null, error: error?.message || "An error occurred" }
//   }
// }

//POSTGRES
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
  getWalletCategoriesStats,
  getCategory,
  getTransactions,
  getTransaction,
  createTransaction,
  editTransaction,
  deleteTransaction,
}

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
