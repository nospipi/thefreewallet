import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import SignOutBtn from "./SignOutBtn";
import Link from "next/link";

//--------------------------------------------------------------

const wallets = [
  { _id: "66bf3c5eee63e17cb3cfb04e", title: "MAY 2024" },
  { _id: "2222222222222222", title: "JUNE 2024" },
  { _id: "3333333333333333", title: "JULY 2024" },
];

const Home = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100 ">
          <div className="w-7 h-7 border-4 border-theme-darkBrown border-t-transparent border-solid rounded-full animate-spin"></div>
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
            <button className="w-full mb-4 px-4 py-2 bg-theme-darkBrown text-white rounded-md hover:bg-opacity-90">
              Create New Wallet
            </button>
          </Link>
          <div className="flex flex-col space-y-2">
            {wallets.map((wallet) => (
              <Link key={wallet._id} href={`/wallet/${wallet._id}`}>
                <button className="w-full px-4 py-2 bg-theme-lightPeach text-black rounded-md hover:bg-opacity-80">
                  {wallet.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <SignOutBtn />
      </div>
    </Suspense>
  );
};

export default Home
