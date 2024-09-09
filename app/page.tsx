import { Suspense } from "react"
import connectDB from "../db.connect"
const { WalletModel } = require("../databases/mongodb/models")
import { getWallets } from "@/databases/postgres/server_actions";
import { auth } from "@/auth";
import Link from "next/link";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
//   useQuery,
// } from "@tanstack/react-query"

//--------------------------------------------------------------

const Home = async () => {
  const session = await auth();
  const user = session?.user?.email as string;
  await connectDB();

  //const wallets = await WalletModel.find({ user }).sort({ _id: -1 })
  const wallets = await getWallets();

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 items-center justify-center p-5">
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
            {!wallets.length && (
              <p className="text-sm text-center text-gray-500">
                No wallets found
              </p>
            )}
            {wallets?.map((wallet: any) => (
              <Link key={wallet._id} href={`/wallet/${wallet._id}`}>
                <button className="w-full flex justify-between items-center gap-1 px-4 py-2 bg-white text-black hover:bg-theme-darkWhite">
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
                      €{wallet.balance.toFixed(2)}
                    </span>
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 w-full text-center absolute bottom-0 mb-4">
          © 2024{" "}
          <Link
            target="_blank"
            href={"https://vaggelis.dev"}
            className="font-semibold hover:text-theme-dark"
          >
            Vaggelis Magonezos
          </Link>
          , all rights reserved
        </p>
      </div>
    </Suspense>
  );
};

export default Home
