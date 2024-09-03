import NewTransactionForm from "./NewTransactionForm.client"
import { getCategories } from "@/databases/postgres/server_actions"

//-------------------------------------------------------------------------

const AddTransactionPage = async () => {
  const categories = await getCategories()

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Transaction
        </h2>
        <NewTransactionForm categories={JSON.stringify(categories, null, 2)} />
      </div>
    </div>
  )
}

export default AddTransactionPage
