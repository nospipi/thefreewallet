import { auth } from "@/auth"
import { headers } from "next/headers"
import connectDB from "../../../db.connect"
const { TransactionModel } = require("../../../models")
import TransactionItem from "./TransactionItem"
import { Suspense } from "react"

//-----------------------------------------------------------------------------

const TransactionDetailPage = async () => {
  const headerList = headers()
  //passed from middleware.ts
  const pathname = headerList.get("x-current-path")
  const wallet_id = pathname?.match(/\/wallet\/([^\/]+)/) as string[]
  console.log(wallet_id[1])

  const session = await auth()
  await connectDB()

  const transactions = await TransactionModel.find({
    user: session?.user?.email,
    wallet_id: wallet_id[1],
  })
    .sort({ createdAt: -1 })
    .select("_id")

  if (!transactions.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-theme-offWhite text-theme-darkBrown">
        No transactions found
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100 ">
          <div className="w-7 h-7 border-4 border-theme-darkBrown border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 p-4 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          {transactions.map((transaction: any, index: number) => {
            return (
              <TransactionItem
                key={transaction._id.toString()}
                id={transaction._id.toString()}
              />
            )
          })}
        </div>
      </div>
    </Suspense>
  )
}

export default TransactionDetailPage
