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
  { timestamps: true, minimize: false }
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

// const updateWallet = async (
//   action: "save" | "delete" | "update",
//   transaction: any
// ): Promise<void> => {
//   try {
//     const actions = ["save", "delete", "update"]
//     if (!actions.includes(action)) {
//       throw new Error("Invalid action")
//     }

//     if (!transaction.wallet_id || !transaction.amount) {
//       throw new Error("Transaction must include wallet_id and amount")
//     }

//     const wallet = (await model("wallet")
//       .findOne({ _id: transaction.wallet_id })
//       .lean()) as {
//       balance: number
//       expenses: number
//       income: number
//       income_transactions_count: number
//       expenses_transactions_count: number
//       transactions_count: number
//     }
//     console.log("wallet lean", wallet)

//     const newWallet = {
//       balance: wallet.balance,
//       expenses: wallet.expenses,
//       income: wallet.income,
//       income_transactions_count: wallet.income_transactions_count,
//       expenses_transactions_count: wallet.expenses_transactions_count,
//       transactions_count: wallet.transactions_count,
//     } as {
//       balance: number
//       expenses: number
//       income: number
//       income_transactions_count: number
//       expenses_transactions_count: number
//       transactions_count: number
//     }

//     console.log("newWallet after copying", newWallet)

//     if (action === "save") {
//       if (transaction.type === "expense") {
//         console.log("expense transaction")
//         console.log("transaction.amount", transaction.amount)
//         console.log("newWallet.balance", newWallet.balance)
//         console.log("newWallet.expenses", newWallet.expenses)
//         console.log("newWallet.income", newWallet.income)
//         console.log(
//           "newWallet.income_transactions_count",
//           newWallet.income_transactions_count
//         ) //ISSUE sometimes its undefined
//         console.log(
//           "newWallet.expenses_transactions_count",
//           newWallet.expenses_transactions_count
//         ) //ISSUE sometimes its undefined
//         console.log(
//           "newWallet.transactions_count",
//           newWallet.transactions_count
//         ) //ISSUE sometimes its undefined

//         newWallet.expenses_transactions_count += 1
//         newWallet.transactions_count += 1
//         newWallet.balance -= transaction.amount
//         newWallet.expenses += transaction.amount

//         console.log("\n")
//         console.log("newWallet.balance after modifying", newWallet.balance)
//         console.log("newWallet.expenses after modifying", newWallet.expenses)
//         console.log("newWallet.income after modifying", newWallet.income)
//         console.log(
//           "newWallet.transactions_count after modifying",
//           newWallet.transactions_count
//         )
//         console.log(
//           "newWallet.income_transactions_count after modifying",
//           newWallet.income_transactions_count
//         )
//         console.log(
//           "newWallet.expenses_transactions_count after modifying",
//           newWallet.expenses_transactions_count
//         )

//         await model("wallet").findByIdAndUpdate(
//           transaction.wallet_id,
//           {
//             balance: newWallet.balance,
//             expenses: newWallet.expenses,
//             expenses_transactions_count: newWallet.expenses_transactions_count,
//             transactions_count: newWallet.transactions_count,
//           },
//           {
//             new: true,
//           }
//         )
//       }
//       if (transaction.type === "income") {
//         console.log("income transaction")
//         console.log("transaction.amount", transaction.amount)
//         console.log("newWallet.balance", newWallet.balance)
//         console.log("newWallet.expenses", newWallet.expenses)
//         console.log("newWallet.income", newWallet.income)
//         console.log(
//           "newWallet.income_transactions_count",
//           newWallet.income_transactions_count
//         ) //ISSUE sometimes its undefined
//         console.log(
//           "newWallet.expenses_transactions_count",
//           newWallet.expenses_transactions_count
//         ) //ISSUE sometimes its undefined
//         console.log(
//           "newWallet.transactions_count",
//           newWallet.transactions_count
//         ) //ISSUE sometimes its undefined

//         newWallet.income_transactions_count += 1
//         newWallet.transactions_count += 1
//         newWallet.balance += transaction.amount
//         newWallet.income += transaction.amount

//         //add console line break
//         console.log("\n")
//         console.log("newWallet.balance after modifying", newWallet.balance)
//         console.log("newWallet.expenses after modifying", newWallet.expenses)
//         console.log("newWallet.income after modifying", newWallet.income)
//         console.log(
//           "newWallet.transactions_count after modifying",
//           newWallet.transactions_count
//         )
//         console.log(
//           "newWallet.income_transactions_count after modifying",
//           newWallet.income_transactions_count
//         )
//         console.log(
//           "newWallet.expenses_transactions_count after modifying",
//           newWallet.expenses_transactions_count
//         )

//         await model("wallet").findByIdAndUpdate(
//           transaction.wallet_id,
//           {
//             balance: newWallet.balance,
//             income: newWallet.income,
//             income_transactions_count: newWallet.income_transactions_count,
//             transactions_count: newWallet.transactions_count,
//           },
//           {
//             new: true,
//           }
//         )
//       }
//     }

//     // if (action === "delete") {
//     //   if (transaction.type === "expense") {
//     //     wallet.balance += transaction.amount
//     //     wallet.expenses -= transaction.amount
//     //     wallet.expenses_transactions_count -= 1
//     //     wallet.transactions_count -= 1
//     //     wallet.markModified("balance")
//     //     wallet.markModified("expenses")
//     //     wallet.markModified("expenses_transactions_count")
//     //     wallet.markModified("transactions_count")
//     //     wallet.save()
//     //   }
//     //   if (transaction.type === "income") {
//     //     wallet.balance -= transaction.amount
//     //     wallet.income -= transaction.amount
//     //     wallet.income_transactions_count -= 1
//     //     wallet.transactions_count -= 1
//     //     wallet.markModified("balance")
//     //     wallet.markModified("income")
//     //     wallet.markModified("income_transactions_count")
//     //     wallet.markModified("transactions_count")
//     //     wallet.save()
//     //   }
//     // }
//   } catch (error: any) {
//     throw new Error(error.message)
//   }
// }

const updateWallet = async (
  action: "save" | "delete" | "update",
  transaction: any
): Promise<void> => {
  try {
    const actions = ["save", "delete", "update"]
    if (!actions.includes(action)) {
      throw new Error("Invalid action")
    }

    if (!transaction.wallet_id || !transaction.amount) {
      throw new Error("Transaction must include wallet_id and amount")
    }

    const wallet = (await model("wallet")
      .findOne({ _id: transaction.wallet_id })
      .lean()) as {
      balance: number
      expenses: number
      income: number
      income_transactions_count: number
      expenses_transactions_count: number
      transactions_count: number
    }
    console.log("wallet lean", wallet)

    const newWallet = {
      balance: wallet.balance,
      expenses: wallet.expenses,
      income: wallet.income,
      income_transactions_count: wallet.income_transactions_count,
      expenses_transactions_count: wallet.expenses_transactions_count,
      transactions_count: wallet.transactions_count,
    } as {
      balance: number
      expenses: number
      income: number
      income_transactions_count: number
      expenses_transactions_count: number
      transactions_count: number
    }

    console.log("newWallet after copying", newWallet)

    if (action === "save") {
      if (transaction.type === "expense") {
        console.log("expense transaction")
        console.log("transaction.amount", transaction.amount)
        console.log("newWallet.balance", newWallet.balance)
        console.log("newWallet.expenses", newWallet.expenses)
        console.log("newWallet.income", newWallet.income)
        console.log(
          "newWallet.income_transactions_count",
          newWallet.income_transactions_count
        ) //ISSUE sometimes its undefined
        console.log(
          "newWallet.expenses_transactions_count",
          newWallet.expenses_transactions_count
        ) //ISSUE sometimes its undefined
        console.log(
          "newWallet.transactions_count",
          newWallet.transactions_count
        ) //ISSUE sometimes its undefined

        newWallet.expenses_transactions_count += 1
        newWallet.transactions_count += 1
        newWallet.balance -= transaction.amount
        newWallet.expenses += transaction.amount

        console.log("\n")
        console.log("newWallet.balance after modifying", newWallet.balance)
        console.log("newWallet.expenses after modifying", newWallet.expenses)
        console.log("newWallet.income after modifying", newWallet.income)
        console.log(
          "newWallet.transactions_count after modifying",
          newWallet.transactions_count
        )
        console.log(
          "newWallet.income_transactions_count after modifying",
          newWallet.income_transactions_count
        )
        console.log(
          "newWallet.expenses_transactions_count after modifying",
          newWallet.expenses_transactions_count
        )

        const updated = await model("wallet").findByIdAndUpdate(
          transaction.wallet_id,
          {
            balance: newWallet.balance,
            expenses: newWallet.expenses,
            expenses_transactions_count: newWallet.expenses_transactions_count,
            transactions_count: newWallet.transactions_count,
          },
          {
            new: true,
          }
        )

        console.log("updated", updated)
      }
      if (transaction.type === "income") {
        console.log("income transaction")
        console.log("transaction.amount", transaction.amount)
        console.log("newWallet.balance", newWallet.balance)
        console.log("newWallet.expenses", newWallet.expenses)
        console.log("newWallet.income", newWallet.income)
        console.log(
          "newWallet.income_transactions_count",
          newWallet.income_transactions_count
        ) //ISSUE sometimes its undefined
        console.log(
          "newWallet.expenses_transactions_count",
          newWallet.expenses_transactions_count
        ) //ISSUE sometimes its undefined
        console.log(
          "newWallet.transactions_count",
          newWallet.transactions_count
        ) //ISSUE sometimes its undefined

        newWallet.income_transactions_count += 1
        newWallet.transactions_count += 1
        newWallet.balance += transaction.amount
        newWallet.income += transaction.amount

        //add console line break
        console.log("\n")
        console.log("newWallet.balance after modifying", newWallet.balance)
        console.log("newWallet.expenses after modifying", newWallet.expenses)
        console.log("newWallet.income after modifying", newWallet.income)
        console.log(
          "newWallet.transactions_count after modifying",
          newWallet.transactions_count
        )
        console.log(
          "newWallet.income_transactions_count after modifying",
          newWallet.income_transactions_count
        )
        console.log(
          "newWallet.expenses_transactions_count after modifying",
          newWallet.expenses_transactions_count
        )

        const updated = await model("wallet").findByIdAndUpdate(
          transaction.wallet_id,
          {
            balance: newWallet.balance,
            income: newWallet.income,
            income_transactions_count: newWallet.income_transactions_count,
            transactions_count: newWallet.transactions_count,
          },
          {
            new: true,
          }
        )

        console.log("updated", updated)
      }
    }

    // if (action === "delete") {
    //   if (transaction.type === "expense") {
    //     wallet.balance += transaction.amount
    //     wallet.expenses -= transaction.amount
    //     wallet.expenses_transactions_count -= 1
    //     wallet.transactions_count -= 1
    //     wallet.markModified("balance")
    //     wallet.markModified("expenses")
    //     wallet.markModified("expenses_transactions_count")
    //     wallet.markModified("transactions_count")
    //     wallet.save()
    //   }
    //   if (transaction.type === "income") {
    //     wallet.balance -= transaction.amount
    //     wallet.income -= transaction.amount
    //     wallet.income_transactions_count -= 1
    //     wallet.transactions_count -= 1
    //     wallet.markModified("balance")
    //     wallet.markModified("income")
    //     wallet.markModified("income_transactions_count")
    //     wallet.markModified("transactions_count")
    //     wallet.save()
    //   }
    // }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

transactionSchema.pre("save", async function (next) {
  try {
    //TEST absence of wallet_id
    // await updateWallet("save", {
    //   ...this,
    //   wallet_id: null,
    // })
    await updateWallet("save", this)
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
    await updateWallet("delete", transaction)
    return next()
  } catch (error: any) {
    next(error)
  }
})

// transactionSchema.pre("findOneAndUpdate", async function (next) {
//   try {
//     // Get the transaction that is being updated
//     const transaction = await this.model.findOne(this.getQuery())

//     if (!transaction) {
//       throw new Error("Transaction not found")
//     }
//     await updateWallet(transaction.wallet_id)
//     return next()
//   } catch (error: any) {
//     next(error)
//   }
// })

//--------------------------------------------------------------
//https://mongoosejs.com/docs/middleware.html#defining
//Calling pre() or post() after compiling a model does not work in Mongoose
//This means that you must add all middleware and plugins before calling mongoose.model()

//@ts-expect-error
mongoose.models = {}
//https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
module.exports = {
  WalletModel: model("wallet", walletSchema),
  CategoryModel: model("category", categorySchema),
  TransactionModel: model("transaction", transactionSchema),
}
