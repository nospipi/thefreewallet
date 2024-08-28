"use server";
const { WalletModel } = require("../../models");
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "../../db.connect";

//------------------------------------------------------------------------------

const createWallet = async (formData: FormData) => {
  const session = await auth();
  await connectDB();
  const title = formData.get("title") as string;
  const user = session?.user?.email as string;

  try {
    const wallet = new WalletModel({ title, user });
    await wallet.save();
    console.log("Wallet saved successfully");
    // return redirect(
    //   `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
    // );

    //throw new Error("Wallet creation failed"); //test error
  } catch (error: any) {
    //if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
    return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
  }

  return redirect(
    `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
  ); // https://nextjs.org/docs/app/api-reference/functions/redirect
  // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.
};

export default createWallet;
