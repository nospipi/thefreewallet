import EditTransactionForm from "./EditTransactionForm.client"
import { getTransaction, getCategories } from "@/lib/serverActionsDbDriver"
import { ITransaction, ICategory } from "@/databases/mongodb/models"
import { headers } from "next/headers"

//-------------------------------------------------------------------------

const TransactionEditPage = async () => {
  const headerList = headers()
  const pathname = headerList.get("x-current-path")
  const segments = pathname?.split("/") || []
  const id = segments[2] || ""

  const transaction: ITransaction = await getTransaction(id)
  const categories: ICategory[] = await getCategories()

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Transaction
        </h2>
        <EditTransactionForm
          transaction={JSON.stringify(transaction, null, 2)}
          categories={JSON.stringify(categories, null, 2)}
        />
      </div>
    </div>
  )
}

export default TransactionEditPage
