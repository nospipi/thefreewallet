import mongoose from "mongoose"
import moment from "moment"
const { Schema, model } = mongoose

//-------------------------------------------------------------------------------

const walletSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const transactionSchema = new Schema(
  {
    wallet_id: { type: String, required: true },
    category_id: { type: String, required: true },
    user: { type: String, required: true },
    amount: { type: Number, required: true },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

transactionSchema.pre("save", async function (next) {
  try {
    const wallet = await mongoose.model("wallet").findById(this.wallet_id);
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    // Accumulate the wallet's balance
    wallet.balance += this.amount;

    // Save the updated wallet
    await wallet.save();

    next();
  } catch (error: any) {
    next(error);
  }
});

//--------------------------------------------------------------
//@ts-expect-error
mongoose.models = {}
//https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
module.exports = {
  WalletModel: model("wallet", walletSchema),
  CategoryModel: model("category", categorySchema),
  TransactionModel: model("transaction", transactionSchema),
}
