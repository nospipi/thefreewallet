import EditTransactionForm from "./EditTransactionForm"

//-------------------------------------------------------------------------

const TransactionEditPage = async () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Transaction
        </h2>
        <EditTransactionForm />
      </div>
    </div>
  )
}

export default TransactionEditPage
