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

// const deleteWallet = async (): Promise<IActionState> => {
//   try {
//     await connectDB()
//     const headerList = headers()
//     const pathname = headerList.get("x-current-path")
//     const segments = pathname?.split("/") || []
//     const wallet_id = segments[2] || ""
//     //throw new Error("test error"); // Simulate error
//     await TransactionModel.deleteMany({ wallet_id })
//     await WalletModel.findOneAndDelete({ _id: wallet_id })
//     revalidatePath(`/`, "page")
//     return { success: `Wallet deleted successfully`, error: null }
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: null, error: error?.message || "An error occurred" }
//   }
// }

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

export { getWallets, getWallet, createWallet, editWallet, deleteWallet }

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
