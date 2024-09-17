import Link from "next/link"
import moment from "moment"
import { getTransaction, getCategory } from "@/lib/serverActionsDbDriver"

//-----------------------------------------------------------------------------

interface TransactionItemProps {
  id: string
}

const TransactionItem = async ({ id }: TransactionItemProps) => {
  const transaction = await getTransaction(id)
  const category = await getCategory(transaction?.category_id)

  return (
    <Link href="/transaction/[id]" as={`/transaction/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-end hover:shadow-lg hover:scale-102 transition transform duration-200 w-full">
        <div className="flex flex-col gap-1 w-full">
          <h4 className="font-semibold text-gray-800">
            {transaction.description}
          </h4>
          <div className="text-sm text-gray-500">
            Date: {moment(transaction.date).format("ddd DD MMM YYYY")}
          </div>
          <div className="flex flex-row flex-1 text-sm text-gray-500 gap-6 justify-between items-center">
            <span>Category: {category?.title || "Invalid Category"}</span>
            <span
              className={`font-semibold ${
                transaction.type === "income"
                  ? "text-theme-darkGreen"
                  : "text-theme-indianRed"
              }`}
            >
              <strong>€{transaction.amount.toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TransactionItem
