import Link from "next/link";

interface TransactionItemProps {
  id: string;
  description: string;
  date: string;
  created_at: string;
  amount: number;
}
const TransactionItem = ({
  id,
  description,
  date,
  created_at,
  amount,
}: TransactionItemProps) => {
  return (
    <Link href="/transaction/[id]" as={`/transactions/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4 hover:shadow-lg hover:scale-102 transition transform duration-200">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">{description}</h4>
          <div className="text-sm text-gray-500">Date: {date}</div>
          <div className="text-sm text-gray-500">Created at: {created_at}</div>
        </div>
        <div className="text-right">
          <p
            className={`text-lg font-semibold ${
              amount >= 0 ? "text-theme-darkGreen" : "text-theme-indianRed"
            }`}
          >
            <strong>€{amount.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;
