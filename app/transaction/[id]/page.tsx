import { Suspense } from "react"
import Link from "next/link"
import DeleteBtn from "../DeleteBtn.client"
import { getTransaction, getCategory } from "@/lib/serverActionsDbDriver"
import { ITransaction, ICategory } from "@/databases/mongodb/models"
import moment from "moment"
import { headers } from "next/headers"
import { nanoid } from "nanoid"

//-----------------------------------------------------------------------------

const TransactionPage = async () => {
  const headerList = headers()
  const pathname = headerList.get("x-current-path")
  const segments = pathname?.split("/") || []
  const id = segments[2] || ""
  const transaction: ITransaction = await getTransaction(id)
  const category: ICategory = await getCategory(
    transaction?.category_id || nanoid()
    //in case category_id is not found
    //this will return empty category and show "Invalid Category"
  )

  if (!transaction) {
    return (
      <div
        className="
        flex flex-1 items-center justify-center h-screen text-theme-dark
    "
      >
        Transaction not found
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            {transaction.type === "income" ? "Income" : "Expense"} Details
          </h1>
          <p className="text-md text-gray-700 mb-2">
            <strong>Description:</strong> {transaction.description}
          </p>
          <p className="text-md text-gray-700 mb-2">
            <strong>Category:</strong> {category?.title || "Invalid Category"}
          </p>
          <p className="text-md text-gray-700 mb-2">
            <strong>Date:</strong>{" "}
            {moment(transaction.date).format("ddd DD MMM YYYY")}
          </p>
          <p className="text-md text-gray-700 mb-2">
            <strong>Created at:</strong>{" "}
            {moment(transaction.createdAt).format("ddd DD MMM YY - HH:mm:ss")}
          </p>
          <p className={`text-md font-semibold`}>
            <span>Amount:</span>{" "}
            <strong
              className={`${
                transaction.type === "income"
                  ? "text-theme-darkGreen"
                  : "text-theme-indianRed"
              }`}
            >
              €{transaction.amount.toFixed(2)}
            </strong>
          </p>
          <div className="flex space-x-4 mt-6 justify-end">
            <DeleteBtn />
            <Link href={`/transaction/${transaction.id}/edit`}>
              <button className="px-4 py-2 bg-theme-dark text-white rounded-md shadow-sm hover:bg-opacity-90 select-none">
                Edit
              </button>
            </Link>
            <Link href={`/wallet/${transaction.wallet_id}`}>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 select-none">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default TransactionPage
