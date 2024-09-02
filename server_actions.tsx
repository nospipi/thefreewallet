"use server"
const { WalletModel, TransactionModel } = require("./models")
import { auth } from "@/auth"
import connectDB from "./db.connect"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null;
  error: string | null;
}

const createWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    const session = await auth();
    await connectDB();
    const title = formData.get("title") as string;
    const user = session?.user?.email as string;

    const wallet = new WalletModel({ title, user });
    await wallet.save();
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Wallet ${title} created successfully`, error: null };
  } catch (error: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" };
  }
};

const deleteWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    await connectDB();
    const wallet_id = formData.get("wallet_id") as string;
    console.log("wallet_id server action", wallet_id);
    await WalletModel.findOneAndDelete({ _id: wallet_id });
    //revalidatePath(`/`, "page");
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    redirect("/");
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" };
  }
};

const createTransaction = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    await connectDB();
    const session = await auth();
    const description = formData.get("description") as string;
    const amount = formData.get("amount") as string;
    const date = formData.get("date") as string;
    const user = session?.user?.email as string;
    const type = formData.get("type") as string;
    const wallet_id = formData.get("wallet_id") as string;

    const payload = {
      wallet_id: wallet_id,
      category_id: "66bf3d93c2924bd2156e699f", //temporary
      user,
      amount: type === "income" ? parseInt(amount) : -parseInt(amount),
      date,
      description,
    };

    const transaction = new TransactionModel(payload);
    await transaction.save();
    revalidatePath(`/wallet/${wallet_id}`, "page");
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: `Transaction created successfully`, error: null };
  } catch (error: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" };
  }
};

const deleteTransaction = async (): Promise<IActionState> => {
  try {
    await connectDB();
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const segments = pathname?.split("/") || [];
    const id = segments[2] || "";
    //throw new Error("test error") // Simulate error
    await TransactionModel.findOneAndDelete({ _id: id });
    revalidatePath(`/transaction/${id}`, "page");
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network

    return { success: `Transaction deleted successfully`, error: null };
  } catch (error: any) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
    return { success: null, error: error?.message || "An error occurred" };
  }
};

export { createWallet, deleteWallet, createTransaction, deleteTransaction };

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
