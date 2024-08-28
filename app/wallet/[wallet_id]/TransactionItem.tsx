import Link from "next/link";
import moment from "moment";
const { TransactionModel } = require("../../../models");

//-----------------------------------------------------------------------------

interface TransactionItemProps {
  id: string;
}

const TransactionItem = async ({ id }: TransactionItemProps) => {
  const transaction = await TransactionModel.findById(id);

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
            Created at:{" "}
            {moment(transaction.createdAt).format("ddd DD MMM YYYY hh:mm A")}
          </div>
        </div>

        <p
          className={`text-lg font-semibold ${
            transaction.amount >= 0
              ? "text-theme-darkGreen"
              : "text-theme-indianRed"
          }`}
        >
          <strong>€{transaction.amount.toFixed(2)}</strong>
        </p>
      </div>
    </Link>
  );
};

export default TransactionItem;
