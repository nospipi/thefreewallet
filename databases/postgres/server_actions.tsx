"use server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import db from "./db"

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

const getWallet = async (): Promise<any> => {
  try {
    const headerList = headers()
    const pathname = headerList.get("x-current-path")
    const segments = pathname?.split("/") || []
    const id = segments[2] || ""
    //const wallet = get wallet of this id with sql command
    const wallet = await db
      .selectFrom("wallets")
      .where("id", "=", id)
      .selectAll() // or specify columns like ['id', 'title', 'user', ...]
      .executeTakeFirst()

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
    // Assume `auth()` returns a session object with user details
    const session = await auth()
    const title = formData.get("title") as string
    const user = session?.user?.email as string

    // Insert the new wallet into the database
    await db
      .insertInto("wallets")
      .values({
        title,
        user,
        transactions_count: 0, // Set default values if needed
        expenses_transactions_count: 0,
        income_transactions_count: 0,
        balance: 0,
        expenses: 0,
        income: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning(["id", "title"]) // Return the newly created wallet's ID and title
      .executeTakeFirst()

    // Simulate slow network or other processing if needed
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Successful response
    return { success: `Wallet ${title} created successfully`, error: null }
  } catch (error: any) {
    // Handle unique constraint violation and other errors
    if (error.code === "23505") {
      // Unique violation code in PostgreSQL
      return {
        success: null,
        error: "Wallet with that title already exists",
      }
    }
    return { success: null, error: error?.message || "An error occurred" }
  }
}

export { getWallet, createWallet }

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
