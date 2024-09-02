import { auth } from "@/auth"
import Link from "next/link"
import { headers } from "next/headers"
import connectDB from "../../../db.connect"
const { TransactionModel } = require("../../../models")
import TransactionItem from "./TransactionItem"
import { Suspense } from "react"
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuButton from "./MenuButton";

//-----------------------------------------------------------------------------

const TransactionDetailPage = async () => {
  const headerList = headers();
  //passed from middleware.ts
  const pathname = headerList.get("x-current-path");
  const wallet_id = pathname?.match(/\/wallet\/([^\/]+)/) as string[];

  const session = await auth();
  await connectDB();

  const transactions = await TransactionModel.find({
    user: session?.user?.email,
    wallet_id: wallet_id[1],
  })
    .sort({ createdAt: -1 })
    .select("_id");

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="w-7 h-7 border-4 border-theme-dark border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-1 flex-col items-center bg-gray-100 h-full overflow-auto relative">
        <MenuButton />
        <Link href={`/wallet/${wallet_id[1]}/add_transaction`}>
          <IconButton
            aria-label="add"
            color="success"
            sx={{
              position: "absolute",
              bottom: 5,
              right: 5,
              zIndex: 1,
              border: "2px solid #e0e0e0",
            }}
          >
            <AddIcon />
          </IconButton>
        </Link>

        {!transactions.length && (
          <div className="flex flex-1 items-center justify-center bg-gray-100">
            No transactions found
          </div>
        )}

        {transactions.length && (
          <div className="flex flex-col gap-2 overflow-y-auto p-1">
            {transactions.map((transaction: any, index: number) => {
              return (
                <TransactionItem
                  key={transaction._id.toString()}
                  id={transaction._id.toString()}
                />
              );
            })}
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default TransactionDetailPage
