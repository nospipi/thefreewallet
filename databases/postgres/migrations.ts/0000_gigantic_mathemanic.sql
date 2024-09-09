CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"user" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"wallet_id" varchar(36) NOT NULL,
	"category_id" varchar(36) NOT NULL,
	"user" varchar(36) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"type" varchar(50) NOT NULL,
	"date" varchar(10) DEFAULT 'now' NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallets" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(20) NOT NULL,
	"user" varchar(36) NOT NULL,
	"transactions_count" integer DEFAULT 0 NOT NULL,
	"expenses_transactions_count" integer DEFAULT 0 NOT NULL,
	"income_transactions_count" integer DEFAULT 0 NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"expenses" integer DEFAULT 0 NOT NULL,
	"income" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_user_title_idx" ON "categories" USING btree ("user","title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wallet_user_title_idx" ON "wallets" USING btree ("user","title");