import { Suspense } from "react"
import connectDB from "../db.connect"
const { WalletModel } = require("../models")
import { auth } from "@/auth"
import Link from "next/link"
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
//   useQuery,
// } from "@tanstack/react-query"

//--------------------------------------------------------------

const Home = async () => {
  const session = await auth()
  const user = session?.user?.email as string
  await connectDB()

  const wallets = await WalletModel.find({ user }).sort({ _id: -1 })

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100 ">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      {/* <TransactionsList /> */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-8 relative">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Select Wallet
          </h1>

          <Link href="/create_wallet">
            <button className="w-full mb-4 px-4 py-2 bg-theme-dark text-white rounded-md hover:bg-opacity-90">
              Create New Wallet
            </button>
          </Link>
          <div className="flex flex-col space-y-2 h-64 overflow-y-auto">
            {wallets.map((wallet: any) => (
              <Link key={wallet._id} href={`/wallet/${wallet._id}`}>
                <button className="w-full flex justify-between gap-1 px-4 py-2 bg-white text-black hover:bg-theme-darkWhite">
                  <span>{wallet.title}</span>
                  <span className="text-sm text-gray-500">
                    Balance{" "}
                    <span
                      className={`${
                        wallet.balance >= 0
                          ? "text-theme-darkGreen"
                          : "text-theme-indianRed"
                      }`}
                    >
                      {wallet.balance}
                    </span>
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Home
