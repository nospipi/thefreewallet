import { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import connectDB from "../../../db.connect";
const { TransactionModel } = require("../../../models");
import moment from "moment";
import { redirect } from "next/navigation";

//-----------------------------------------------------------------------------

const TransactionPage = async () => {
  const headerList = headers();
  //passed from middleware.ts
  const pathname = headerList.get("x-current-path");
  const id = pathname?.match(/\/transaction\/([^\/]+)/) as string[];

  const session = await getServerSession();
  await connectDB();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const transaction = await TransactionModel.findOne({
    _id: id[1],
    user: session?.user?.email,
  });

  if (!transaction) {
    return (
      <div
        className="
        flex items-center justify-center h-screen bg-theme-offWhite text-theme-darkBrown
    "
      >
        Transaction not found
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="w-7 h-7 border-4 border-theme-darkBrown border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Transaction Details
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Description:</strong> {transaction.description}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Date:</strong>{" "}
            {moment(transaction.date).format("ddd DD MMM YYYY")}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Created at:</strong>{" "}
            {moment(transaction.createdAt).format("ddd DD MMM YY - HH:mm:ss")}
          </p>
          <p className={`text-lg font-semibold`}>
            <span>Amount:</span>{" "}
            <strong
              className={`${
                transaction.amount >= 0
                  ? "text-theme-darkGreen"
                  : "text-theme-indianRed"
              }`}
            >
              €{transaction.amount.toFixed(2)}
            </strong>
          </p>
          <div className="flex space-x-4 mt-6 justify-end">
            <Link href={`/transaction/${id[1]}/edit`}>
              <button className="px-4 py-2 bg-theme-darkBrown text-white rounded-md shadow-sm hover:bg-opacity-90">
                Edit
              </button>
            </Link>
            <Link href={`/wallet/${transaction.wallet_id}`}>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default TransactionPage;
