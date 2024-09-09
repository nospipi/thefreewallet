const { drizzle } = require("drizzle-orm/vercel-postgres");
const { sql } = require("@vercel/postgres");
const db = drizzle(sql);
const {
  pgTable,
  uniqueIndex,
  varchar,
  integer,
  numeric,
  text,
  timestamp,
  serial,
  primaryKey,
} = require("drizzle-orm/pg-core");

//-----------------------------------------------------------------------------

const wallet = pgTable(
  "wallets",
  {
    id: varchar("id", { length: 36 }).primaryKey.default(
      //timestamp string
      async () => {
        return new Date().toISOString();
      }
    ),
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

const category = pgTable(
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

const transaction = pgTable("transactions", {
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

//-----------------------------------------------------------------------------

async function seedDatabase() {
  try {
    // Insert test data into 'wallets' table
    await db.insert(wallet).values([
      {
        id: "wallet_id_1",
        title: "Personal Wallet",
        user: "user_id_1",
        transactions_count: 10,
        expenses_transactions_count: 5,
        income_transactions_count: 5,
        balance: 1000,
        expenses: 500,
        income: 1500,
      },
      {
        id: "wallet_id_2",
        title: "Business Wallet",
        user: "user_id_2",
        transactions_count: 20,
        expenses_transactions_count: 12,
        income_transactions_count: 8,
        balance: 2000,
        expenses: 1200,
        income: 3200,
      },
    ]);

    // Insert test data into 'categories' table
    await db.insert(category).values([
      {
        id: "category_id_1",
        title: "Groceries",
        user: "user_id_1",
      },
      {
        id: "category_id_2",
        title: "Office Supplies",
        user: "user_id_2",
      },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase().finally(() => process.exit());
