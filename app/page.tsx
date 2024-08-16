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
        <div className="flex flex-1 items-center justify-center bg-gray-100 ">
          <div className="w-7 h-7 border-4 border-theme-darkBrown border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <TransactionsList />
    </Suspense>
  );
}

export default Home
