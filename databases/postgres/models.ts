import mongoose from "mongoose"
const uniqueValidator = require("mongoose-unique-validator")
import moment from "moment"
const { Schema, model } = mongoose

//-------------------------------------------------------------------------------

const walletSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    user: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    expenses: { type: Number, required: true, default: 0 },
    income: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

walletSchema.index({ user: 1, title: 1 }, { unique: true })

walletSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
}) //https://www.npmjs.com/package/mongoose-unique-validator

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
)

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
)

transactionSchema.pre("save", async function (next) {
  try {
    const wallet = await mongoose.model("wallet").findById(this.wallet_id)
    if (!wallet) {
      throw new Error("Wallet not found")
    }

    // Accumulate the wallet's balance
    wallet.balance += this.amount
    // Accumulate the wallet's expenses
    if (this.amount < 0) {
      wallet.expenses += this.amount
    }
    // Accumulate the wallet's income
    if (this.amount > 0) {
      wallet.income += this.amount
    }

    // Save the updated wallet
    await wallet.save()

    next()
  } catch (error: any) {
    next(error)
  }
})

transactionSchema.pre("findOneAndDelete", async function (next) {
  try {
    // Get the transaction that is being deleted
    const transaction = await this.model.findOne(this.getQuery())

    if (!transaction) {
      throw new Error("Transaction not found")
    }

    // Find the associated wallet using the transaction's wallet_id
    const wallet = await mongoose
      .model("wallet")
      .findById(transaction.wallet_id)

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    // Deduct the wallet's balance
    wallet.balance -= transaction.amount

    // Deduct the wallet's expenses
    if (transaction.amount < 0) {
      wallet.expenses -= transaction.amount
    }

    // Deduct the wallet's income
    if (transaction.amount > 0) {
      wallet.income -= transaction
    }

    // Save the updated wallet
    await wallet.save()

    next()
  } catch (error: any) {
    next(error)
  }
})

//--------------------------------------------------------------
//@ts-expect-error
mongoose.models = {}
//https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
module.exports = {
  WalletModel: model("wallet", walletSchema),
  CategoryModel: model("category", categorySchema),
  TransactionModel: model("transaction", transactionSchema),
}
