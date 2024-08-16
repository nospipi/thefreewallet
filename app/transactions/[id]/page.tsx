import React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import connectDB from "../../../db.connect"
const { TransactionModel } = require("../../../models")
import { redirect } from "next/navigation"

//-----------------------------------------------------------------------------

const TransactionDetailPage: React.FC = async () => {
  const headerList = headers()
  //passed from middleware.ts
  const pathname = headerList.get("x-current-path")
  const id = pathname?.match(/\/transactions\/([^\/]+)/) as string[]

  const session = await getServerSession()
  await connectDB()

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  const transaction = await TransactionModel.findOne({
    _id: id[1],
    user: session?.user?.email,
  })

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Transaction Details
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Description:</strong> {transaction.description}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Date:</strong> {transaction.date}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Created at:</strong> {transaction.created_at}
          </p>
          <p
            className={`text-lg font-semibold ${
              transaction.amount >= 0 ? "text-darkgreen" : "text-indianred"
            }`}
          >
            <strong>Amount:</strong> €{transaction.amount.toFixed(2)}
          </p>
          <div className="flex justify-between items-center mt-6">
            <Link href="/">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Back
              </button>
            </Link>
            <Link href={`/transactions/${id[1]}/edit`}>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default TransactionDetailPage
