// app/add-entry/page.js

import EntryForm from "./Form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

//--------------------------------------------------------------

const AddEntryPage = async () => {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center border-theme-lightGray p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Add a New Wallet
        </h2>
        <EntryForm />
      </div>
    </div>
  )
}

export default AddEntryPage
