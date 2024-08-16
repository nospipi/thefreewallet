import { getServerSession } from "next-auth"
import moment from "moment"
import connectDB from "../../../db.connect"
import TransactionItem from "./TransactionItem"
const { TransactionModel } = require("../../../models")

//--------------------------------------------------------------

const TransactionsList = async () => {
  const session = await getServerSession()
  await connectDB()

  const transactions = await TransactionModel.find({
    user: session?.user?.email,
  }).sort({ createdAt: -1 })

  if (!transactions.length) {
    return (
      <div
        className="
        flex items-center justify-center h-screen bg-theme-offWhite text-theme-darkBrown
    "
      >
        No transactions found
      </div>
    )
  }

  return (
    <div className="flex flex-1 p-4 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        {transactions.map((transaction: any) => {
          return (
            <TransactionItem
              key={transaction._id.toString()}
              id={transaction._id.toString()}
              description={transaction.description}
              date={moment(transaction.date).format("ddd DD MMM YYYY")}
              created_at={moment(transaction.createdAt).format(
                "ddd MM YY hh:mm A"
              )}
              amount={transaction.amount}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TransactionsList
