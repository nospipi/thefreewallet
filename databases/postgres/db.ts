import { createKysely } from "@vercel/postgres-kysely"
import { Generated } from "kysely"

export interface Wallet {
  id: Generated<string>
  title: string
  user: string
  transactions_count: number
  expenses_transactions_count: number
  income_transactions_count: number
  balance: number
  expenses: number
  income: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: Generated<string>
  title: string
  user: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: Generated<string>
  wallet_id: string
  category_id: string
  user: string
  amount: number
  type: string
  date: string
  description: string
  created_at: string
  updated_at: string
}

interface Database {
  wallets: Wallet
  categories: Category
  transactions: Transaction
}

const db = createKysely<Database>()
export default db
