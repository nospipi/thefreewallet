import mongoose from "mongoose"
const uniqueValidator = require("mongoose-unique-validator")
import moment from "moment";

export interface Wallet extends mongoose.Document {
  title: string;
  user: string;
  transactions_count: number;
  expenses_transactions_count: number;
  income_transactions_count: number;
  balance: number;
  expenses: number;
  income: number;
}

export interface Category extends mongoose.Document {
  title: string;
  user: string;
}

export interface Transaction extends mongoose.Document {
  wallet_id: string;
  category_id: string;
  user: string;
  amount: number;
  type: string;
  date: string;
  description: string;
}

//-------------------------------------------------------------------------------

const walletSchema = new mongoose.Schema<Wallet>(
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
);

//walletSchema.index({ user: 1, title: 1 }, { unique: true });

walletSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
}); //https://www.npmjs.com/package/mongoose-unique-validator

const categorySchema = new mongoose.Schema<Category>(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const transactionSchema = new mongoose.Schema<Transaction>(
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
);

const updateWallet = async (
  action: "save" | "delete" | "update",
  prevTransaction: { [key: string]: any },
  updatedTransaction?: { [key: string]: any }
): Promise<void> => {
  console.log("prevTransaction", prevTransaction);
  console.log("updatedTransaction", updatedTransaction);
  try {
    const actions = ["save", "delete", "update"];
    if (!actions.includes(action)) {
      throw new Error("Invalid action");
    }

    if (!prevTransaction.wallet_id || !prevTransaction.amount) {
      throw new Error("Transaction must include wallet_id and amount");
    }

    const wallet = (await mongoose
      .model("wallet")
      .findById(prevTransaction.wallet_id)) as Wallet;

    if (action === "save") {
      if (prevTransaction.type === "expense") {
        wallet.expenses_transactions_count += 1;
        wallet.transactions_count += 1;
        wallet.balance -= prevTransaction.amount;
        wallet.expenses += prevTransaction.amount;
        await wallet.save();
      }
      if (prevTransaction.type === "income") {
        wallet.income_transactions_count += 1;
        wallet.transactions_count += 1;
        wallet.balance += prevTransaction.amount;
        wallet.income += prevTransaction.amount;
        await wallet.save();
      }
    }

    if (action === "update") {
      // Reverse the effects of the old transaction
      if (prevTransaction.type === "expense") {
        wallet.balance += prevTransaction.amount;
        wallet.expenses -= prevTransaction.amount;
        wallet.expenses_transactions_count -= 1;
      } else if (prevTransaction.type === "income") {
        wallet.balance -= prevTransaction.amount;
        wallet.income -= prevTransaction.amount;
        wallet.income_transactions_count -= 1;
      }

      // Apply the effects of the new transaction
      if (updatedTransaction?.type === "expense") {
        wallet.balance -= updatedTransaction.amount;
        wallet.expenses += updatedTransaction.amount;
        wallet.expenses_transactions_count += 1;
      } else if (updatedTransaction?.type === "income") {
        wallet.balance += updatedTransaction.amount;
        wallet.income += updatedTransaction.amount;
        wallet.income_transactions_count += 1;
      }
    }

    if (action === "delete") {
      if (prevTransaction.type === "expense") {
        wallet.balance += prevTransaction.amount;
        wallet.expenses -= prevTransaction.amount;
        wallet.expenses_transactions_count -= 1;
        wallet.transactions_count -= 1;
        await wallet.save();
      }
      if (prevTransaction.type === "income") {
        wallet.balance -= prevTransaction.amount;
        wallet.income -= prevTransaction.amount;
        wallet.income_transactions_count -= 1;
        wallet.transactions_count -= 1;
        await wallet.save();
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

transactionSchema.pre("save", async function (next) {
  try {
    await updateWallet("save", this);
    next();
  } catch (error: any) {
    next(error);
  }
});

transactionSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const prevObj = await this.model.findOne(this.getQuery());
    const updateObj = this.getUpdate() as any;
    const prevTransaction = {
      wallet_id: prevObj.wallet_id,
      type: prevObj.type,
      amount: prevObj.amount,
    };
    const updatedTransaction = {
      type: updateObj.type,
      amount: Number(updateObj.amount),
    };
    await updateWallet("update", prevTransaction, updatedTransaction);

    next();
  } catch (error: any) {
    next(error);
  }
});

transactionSchema.pre("findOneAndDelete", async function (next) {
  try {
    const transaction = await this.model.findOne(this.getQuery());
    await updateWallet("delete", transaction);
    next();
  } catch (error: any) {
    next(error);
  }
});

// // Post middleware to update the wallet after the transaction is updated
// transactionSchema.post("findOneAndUpdate", async function (doc, next) {
//   try {
//     console.log("this.TEST", (this as any)?.TEST);
//     //this gets the this.whatever that was set in the pre hook
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

//--------------------------------------------------------------
//https://mongoosejs.com/docs/middleware.html#defining
//Calling pre() or post() after compiling a model does not work in Mongoose
//This means that you must add all middleware and plugins before calling mongoose.model()

// //@ts-expect-error
// mongoose.models = {};
// //https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
// module.exports = {
//   WalletModel: mongoose.model("wallet", walletSchema),
//   CategoryModel: mongoose.model("category", categorySchema),
//   TransactionModel: mongoose.model("transaction", transactionSchema),
// };

export const WalletModel =
  mongoose.models.wallet || mongoose.model("wallet", walletSchema);
export const CategoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);
export const TransactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);

