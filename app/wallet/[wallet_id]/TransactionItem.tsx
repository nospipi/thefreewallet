import Link from "next/link"
import moment from "moment"
const { TransactionModel, CategoryModel } = require("../../../models")

//-----------------------------------------------------------------------------

interface TransactionItemProps {
  id: string
}

const TransactionItem = async ({ id }: TransactionItemProps) => {
  const transaction = await TransactionModel.findById(id)
  const category = await CategoryModel.findById(transaction.category_id)

  return (
    <Link href="/transaction/[id]" as={`/transaction/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-end mb-4 hover:shadow-lg hover:scale-102 transition transform duration-200 ">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">
            {transaction.description}
          </h4>
          <div className="text-sm text-gray-500">
            Date: {moment(transaction.date).format("ddd DD MMM YYYY")}
          </div>
          <div className="text-sm text-gray-500">
            Category: {category?.title || "Invalid Category"}
          </div>
          <div className="text-sm text-gray-500 flex flex-row gap-6 items-center">
            <div>
              Created at:{" "}
              {moment(transaction.createdAt).format("ddd DD MMM YYYY hh:mm A")}
            </div>
            <div
              className={`text-lg font-semibold ${
                transaction.amount >= 0
                  ? "text-theme-darkGreen"
                  : "text-theme-indianRed"
              }`}
            >
              <strong>€{transaction.amount.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TransactionItem
