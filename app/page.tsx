import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import connectDB from "../db.connect"
import { Suspense } from "react"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query"
import TransactionsList from "./components/transactions/TransactionsList"

//--------------------------------------------------------------

const Home = async () => {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex-1 bg-theme-offWhite">
        <TransactionsList />
      </div>
    </Suspense>
  )
}

export default Home
