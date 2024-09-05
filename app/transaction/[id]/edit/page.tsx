import EditTransactionForm from "./EditTransactionForm"
import { getTransaction, getCategories } from "@/serverActionsDbDriver"
import { ITransaction, ICategory } from "@/databases/mongodb/models"

//-------------------------------------------------------------------------

const TransactionEditPage = async () => {
  const transaction: ITransaction = await getTransaction()
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
