"use client"
import { deleteTransaction } from "@/lib/serverActionsDbDriver"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

//---------------------------------------------------------

const DeleteBtn = () => {
  const router = useRouter()
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this transaction?"
    )
    if (confirmDelete) {
      const { success, error } = await deleteTransaction()
      if (success) {
        toast.success(success)
        router.back()
      }
      if (error) {
        toast.error(error)
      }
    }
  }
  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-theme-indianRed text-white rounded-md shadow-sm hover:bg-opacity-90 select-none"
    >
      Delete
    </button>
  )
}

export default DeleteBtn
