import {
  pgTable,
  uniqueIndex,
  varchar,
  integer,
  numeric,
  text,
  timestamp,
  serial,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

const createUniqueId = async () => {
  return uuidv4();
};

//-----------------------------------------------------------------------------

export const wallet = pgTable(
  "wallets",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(uuidv4()), // Assuming
    title: varchar("title", { length: 20 }).notNull(),
    user: varchar("user", { length: 36 }).notNull(),
    transactions_count: integer("transactions_count").notNull().default(0),
    expenses_transactions_count: integer("expenses_transactions_count")
      .notNull()
      .default(0),
    income_transactions_count: integer("income_transactions_count")
      .notNull()
      .default(0),
    balance: integer("balance").notNull().default(0),
    expenses: integer("expenses").notNull().default(0),
    income: integer("income").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserTitleIndex: uniqueIndex("wallet_user_title_idx").on(
      table.user,
      table.title
    ),
  })
);

export const category = pgTable(
  "categories",
  {
    id: varchar("id", { length: 36 }).primaryKey(), // Assuming UUID as ID
    title: varchar("title", { length: 100 }).notNull(),
    user: varchar("user", { length: 36 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserTitleIndex: uniqueIndex("category_user_title_idx").on(
      table.user,
      table.title
    ),
  })
);

export const transaction = pgTable("transactions", {
  id: varchar("id", { length: 36 }).primaryKey(), // Assuming UUID as ID
  wallet_id: varchar("wallet_id", { length: 36 }).notNull(),
  category_id: varchar("category_id", { length: 36 }).notNull(),
  user: varchar("user", { length: 36 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  date: varchar("date", { length: 10 }).default("now").notNull(), // Adjust default value for the date format
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
