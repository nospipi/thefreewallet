import EditTransactionForm from "./EditTransactionForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

//-------------------------------------------------------------------------

const TransactionEditPage = async () => {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Transaction
        </h1>
        <EditTransactionForm />
      </div>
    </div>
  )
}

export default TransactionEditPage
