"use client"
import { deleteWallet } from "@/serverActionsDbDriver"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

//---------------------------------------------------------

const DeleteBtn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete this wallet?
All transactions will be deleted !
      `
    )
    if (confirmDelete) {
      const { success, error } = await deleteWallet()
      if (success) {
        toast.success(success)
        router.back()
      }
      if (error) {
        toast.error(error)
      }
    }
  }
  return <div onClick={handleDelete}>{children}</div>
}

export default DeleteBtn
