"use server"
const { WalletModel, TransactionModel } = require("./models")
import { auth } from "@/auth"
import connectDB from "./db.connect"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null
  error: string | null
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
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Wallet ${title} created successfully`, error: null }
  } catch (error: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
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

export { createWallet, deleteTransaction }

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
