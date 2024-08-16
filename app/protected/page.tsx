import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const ProtectedPage = async () => {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div>THIS IS A PROTECTED PAGE YOU CAN ONLY SEE IF YOU ARE SIGNED IN</div>
  )
}

export default ProtectedPage
