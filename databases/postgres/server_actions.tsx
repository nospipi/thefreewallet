"use server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import db from "./db";
import { wallet } from "./schema";
import { eq } from "drizzle-orm/expressions";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const createUniqueId = async () => {
  return nanoid(20);
};
//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null;
  error: string | null;
}

const newCategory = (input: string): string | false => {
  const regex = /^NEW_CATEGORY=([^_]+)_/;
  const match = input.match(regex);
  return match ? match[1] : false;
};

// export const wallet = pgTable(
//   "wallets",
//   {
//     id: varchar("id", { length: 36 }).primaryKey(), // Assuming UUID as ID
//     title: varchar("title", { length: 20 }).notNull(),
//     user: varchar("user", { length: 36 }).notNull(),
//     transactions_count: integer("transactions_count").notNull().default(0),
//     expenses_transactions_count: integer("expenses_transactions_count")
//       .notNull()
//       .default(0),
//     income_transactions_count: integer("income_transactions_count")
//       .notNull()
//       .default(0),
//     balance: integer("balance").notNull().default(0),
//     expenses: integer("expenses").notNull().default(0),
//     income: integer("income").notNull().default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     uniqueUserTitleIndex: uniqueIndex("wallet_user_title_idx").on(
//       table.user,
//       table.title
//     ),
//   })
// );

//-----------------------------------------------------------------------------

const getWallets = async (): Promise<any> => {
  const session = await auth();
  const user = session?.user?.email as string;
  console.log("getWallets");
  try {
    const res = await db.select().from(wallet);
    console.log(res);

    return res;
  } catch (error: any) {
    return error?.message || "An error occurred";
  }
};

const getWallet = async (): Promise<any> => {
  try {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const segments = pathname?.split("/") || [];
    const id = segments[2] || "";
    //const wallet = get wallet of this id with sql command

    //  const wallet = await db
    //    .selectFrom("wallets")
    //    .where("id", "=", id)
    //    .selectAll() // or specify columns like ['id', 'title', 'user', ...]
    //    .executeTakeFirst();

    //drizzle query

    //const wallet = await db.query.wallet.findMany()
    const res = await db.select().from(wallet);
    console.log(res);

    return res;
  } catch (error: any) {
    return error?.message || "An error occurred";
  }
};

const createWallet = async (
  previousState: IActionState,
  formData: FormData
): Promise<IActionState> => {
  try {
    // Assume `auth()` returns a session object with user details
    const session = await auth();
    const title = formData.get("title") as string;
    const user = session?.user?.email as string;

    // Insert the new wallet into the database
    await db.insert(wallet).values({
      id: await createUniqueId(),
      title,
      user,
    });

    revalidatePath(`/`, "page");

    // Simulate slow network or other processing if needed
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Successful response
    return { success: `Wallet ${title} created successfully`, error: null };
  } catch (error: any) {
    // Handle unique constraint violation and other errors
    if (error.code === "23505") {
      // Unique violation code in PostgreSQL
      return {
        success: null,
        error: "Wallet with that title already exists",
      };
    }
    return { success: null, error: error?.message || "An error occurred" };
  }
};

export { getWallets, getWallet, createWallet };

//------------------------------------------------------------------------------

//   return redirect(
//     `/create_wallet?wallet_created_success=Wallet ${title} created successfully`
//   ); // https://nextjs.org/docs/app/api-reference/functions/redirect
//   // ⓘ In Server Actions and Route Handlers, redirect should be called after the try/catch block.

//if (error.message === "NEXT_REDIRECT") throw error; //https://stackoverflow.com/a/78081880/14718856 //next redirect returns error by default so we intercept it
//return redirect(`/create_wallet?wallet_created_error=${error?.message}`);
