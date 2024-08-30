import { auth } from "@/auth"
import Link from "next/link"
import { headers } from "next/headers"
import connectDB from "../../../db.connect"
const { TransactionModel } = require("../../../models")
import TransactionItem from "./TransactionItem"
import { Suspense } from "react"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

//-----------------------------------------------------------------------------

const TransactionDetailPage = async () => {
  const headerList = headers()
  //passed from middleware.ts
  const pathname = headerList.get("x-current-path")
  const wallet_id = pathname?.match(/\/wallet\/([^\/]+)/) as string[]

  const session = await auth()
  await connectDB()

  const transactions = await TransactionModel.find({
    user: session?.user?.email,
    wallet_id: wallet_id[1],
  })
    .sort({ createdAt: -1 })
    .select("_id")

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 p-4 bg-gray-100 relative">
        {!transactions.length && (
          <div className="flex flex-1 items-center justify-center p-4 bg-gray-100">
            No transactions found
          </div>
        )}

        {transactions.length && (
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
        )}
      </div>
      <Link href={`/wallet/${wallet_id[1]}/add_transaction`}>
        <IconButton
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "#D8D8D8",
          }}
        >
          <AddIcon />
        </IconButton>
      </Link>
    </Suspense>
  )
}

export default TransactionDetailPage
