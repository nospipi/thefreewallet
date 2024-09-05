import mongoose from "mongoose"
const uniqueValidator = require("mongoose-unique-validator")
import moment from "moment"

export interface IWallet extends mongoose.Document {
  _id: string
  title: string
  user: string
  transactions_count: number
  expenses_transactions_count: number
  income_transactions_count: number
  balance: number
  expenses: number
  income: number
}

export interface ICategory extends mongoose.Document {
  title: string
  user: string
}

export interface ITransaction extends mongoose.Document {
  wallet_id: string
  category_id: string
  user: string
  amount: number
  type: string
  date: string
  description: string
  createdAt: string
  updatedAt: string
}

//-------------------------------------------------------------------------------

const walletSchema = new mongoose.Schema<IWallet>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    user: { type: String, required: true },
    transactions_count: { type: Number, required: true, default: 0 },
    expenses_transactions_count: {
      type: Number,
      required: true,
      default: 0,
    },
    income_transactions_count: {
      type: Number,
      required: true,
      default: 0,
    },
    balance: { type: Number, required: true, default: 0 },
    expenses: { type: Number, required: true, default: 0 },
    income: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

walletSchema.index({ user: 1, title: 1 }, { unique: true })

walletSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
}) //https://www.npmjs.com/package/mongoose-unique-validator

const categorySchema = new mongoose.Schema<ICategory>(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
)

categorySchema.index({ user: 1, title: 1 }, { unique: true })

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    wallet_id: { type: String, required: true },
    category_id: { type: String, required: true },
    user: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

const updateWallet = async (
  action: "save" | "delete" | "update",
  prevTransaction: { [key: string]: any },
  updatedTransaction?: { [key: string]: any }
): Promise<void> => {
  try {
    const actions = ["save", "delete", "update"]
    if (!actions.includes(action)) {
      throw new Error("Invalid action")
    }

    if (!prevTransaction.wallet_id || !prevTransaction.amount) {
      throw new Error("Transaction must include wallet_id and amount")
    }

    const wallet = (await mongoose
      .model("wallet")
      .findById(prevTransaction.wallet_id)) as IWallet

    if (action === "save") {
      if (prevTransaction.type === "expense") {
        wallet.expenses_transactions_count += 1
        wallet.transactions_count += 1
        wallet.balance -= prevTransaction.amount
        wallet.expenses += prevTransaction.amount
        await wallet.save()
      }
      if (prevTransaction.type === "income") {
        wallet.income_transactions_count += 1
        wallet.transactions_count += 1
        wallet.balance += prevTransaction.amount
        wallet.income += prevTransaction.amount
        await wallet.save()
      }
    }

    if (action === "update") {
      // Reverse the effects of the old transaction
      // basically like its being deleted
      if (prevTransaction.type === "expense") {
        wallet.balance += prevTransaction.amount
        wallet.expenses -= prevTransaction.amount
        wallet.expenses_transactions_count -= 1
        //no need to save here, as we will save after applying the new transaction
      }
      if (prevTransaction.type === "income") {
        wallet.balance -= prevTransaction.amount
        wallet.income -= prevTransaction.amount
        wallet.income_transactions_count -= 1
        // no need to save here, as we will save after applying the new transaction
      }

      // Apply the effects of the new transaction
      if (updatedTransaction?.type === "expense") {
        wallet.balance -= updatedTransaction.amount
        wallet.expenses += updatedTransaction.amount
        wallet.expenses_transactions_count += 1
        await wallet.save()
      }
      if (updatedTransaction?.type === "income") {
        wallet.balance += updatedTransaction.amount
        wallet.income += updatedTransaction.amount
        wallet.income_transactions_count += 1
        await wallet.save()
      }
    }

    if (action === "delete") {
      if (prevTransaction.type === "expense") {
        wallet.balance += prevTransaction.amount
        wallet.expenses -= prevTransaction.amount
        wallet.expenses_transactions_count -= 1
        wallet.transactions_count -= 1
        await wallet.save()
      }
      if (prevTransaction.type === "income") {
        wallet.balance -= prevTransaction.amount
        wallet.income -= prevTransaction.amount
        wallet.income_transactions_count -= 1
        wallet.transactions_count -= 1
        await wallet.save()
      }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

transactionSchema.pre("save", async function (next) {
  try {
    await updateWallet("save", this)
    next()
  } catch (error: any) {
    next(error)
  }
})

transactionSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const prevObj = await this.model.findOne(this.getQuery())
    const updateObj = this.getUpdate() as any
    const prevTransaction = {
      wallet_id: prevObj.wallet_id,
      type: prevObj.type,
      amount: prevObj.amount,
    }
    const updatedTransaction = {
      type: updateObj.type,
      amount: Number(updateObj.amount),
    }
    await updateWallet("update", prevTransaction, updatedTransaction)

    next()
  } catch (error: any) {
    next(error)
  }
})

transactionSchema.pre("findOneAndDelete", async function (next) {
  try {
    const transaction = await this.model.findOne(this.getQuery())
    await updateWallet("delete", transaction)
    next()
  } catch (error: any) {
    next(error)
  }
})

//--------------------------------------------------------------

export const WalletModel =
  mongoose.models.wallet || mongoose.model("wallet", walletSchema)
export const CategoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema)
export const TransactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema)
