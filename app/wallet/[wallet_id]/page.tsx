import Link from "next/link"
import { getWallet, getTransactions } from "@/serverActionsDbDriver"
import { IWallet, ITransaction } from "@/databases/mongodb/models"
import TransactionItem from "./TransactionItem"
import { Suspense } from "react"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import MenuButton from "./MenuButton"

//-----------------------------------------------------------------------------

const TransactionDetailPage = async () => {
  const wallet: IWallet = await getWallet()
  const transactions: ITransaction[] = await getTransactions()

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 flex-col items-center h-full overflow-hidden relative">
        <MenuButton />

        <div className="flex flex-col gap-2 overflow-y-auto p-1">
          <div className="p-4 rounded-lg bg-white text-grey border ">
            <h2 className="text-lg text-theme-dark font-bold mb-3">
              {wallet?.title}
            </h2>
            <div className="flex flex-row justify-between gap-12">
              <p className="text-sm">Transactions Count</p>
              <p className="text-md text-theme-dark font-bold">
                {wallet?.transactions_count}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-12">
              <p className="text-sm">Expenses Transactions Count</p>
              <p className="text-md text-theme-dark font-bold">
                {wallet?.expenses_transactions_count}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-12">
              <p className="text-sm">Income Transactions Count</p>
              <p className="text-md text-theme-dark font-bold">
                {wallet?.income_transactions_count}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-12">
              <p className="text-sm">Total Expenses</p>
              <p className="text-md text-theme-indianRed font-bold">
                €{wallet?.expenses.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-12">
              <p className="text-sm">Total Income</p>
              <p className="text-md text-theme-darkGreen font-bold">
                €{wallet?.income.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-12 mt-3">
              <p className="text-md font-bold">Balance</p>
              <p
                className={`text-md font-bold ${
                  wallet?.balance > 0
                    ? "text-theme-darkGreece"
                    : "text-theme-indianRed"
                }`}
              >
                €{wallet?.balance.toFixed(2)}
              </p>
            </div>
          </div>

          {transactions.length ? (
            transactions.map((transaction: any) => {
              return (
                <TransactionItem
                  key={transaction._id.toString()}
                  id={transaction._id.toString()}
                />
              )
            })
          ) : (
            <></>
          )}
        </div>
        {!transactions.length && (
          <div className="flex flex-1 items-center justify-center">
            No transactions found
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default TransactionDetailPage
