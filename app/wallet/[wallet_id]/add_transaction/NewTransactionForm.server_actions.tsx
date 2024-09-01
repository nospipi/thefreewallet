"use server"
const { TransactionModel } = require("../../../../models")
import { auth } from "@/auth"
import connectDB from "../../../../db.connect";
import { revalidatePath } from "next/cache";

//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null;
  error: string | null;
}

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

export { createTransaction }

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
