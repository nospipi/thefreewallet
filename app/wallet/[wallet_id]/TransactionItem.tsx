import Link from "next/link"
import moment from "moment"
const { TransactionModel, CategoryModel } = require("../../../models")

//-----------------------------------------------------------------------------

interface TransactionItemProps {
  id: string
}

const TransactionItem = async ({ id }: TransactionItemProps) => {
  const transaction = await TransactionModel.findById(id);
  const category = await CategoryModel.findById(transaction.category_id);
  //flex flex-row flex-1 text-sm text-gray-500 gap-6 justify-between items-center w-full bg-theme-blue
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
          <div className="text-sm text-gray-500">
            Category: {category?.title || "Invalid Category"}
          </div>
          <div className="flex flex-row flex-1 text-sm text-gray-500 gap-6 justify-between items-center">
            <span>
              Created at:{" "}
              {moment(transaction.createdAt).format("ddd DD MMM YYYY hh:mm A")}
            </span>
            <span
              className={`text-lg font-semibold ${
                transaction.amount >= 0
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
  );
}

export default TransactionItem
