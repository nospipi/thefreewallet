"use server";
const { WalletModel } = require("../../models");
import { auth } from "@/auth";
import connectDB from "../../db.connect";

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
    console.log("formData", formData);
    const session = await auth();
    await connectDB();
    const title = formData.get("title") as string;
    const user = session?.user?.email as string;

    const wallet = new WalletModel({ title, user });
    await wallet.save();
    console.log("Wallet created successfully");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: `Wallet ${title} created successfully`, error: null };
  } catch (error: any) {
    return { success: null, error: error.message };
  }
};

export default createWallet;

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
