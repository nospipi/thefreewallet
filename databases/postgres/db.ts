import { PrismaClient } from "@prisma/client"
import { updateWallet } from "./server_actions"

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      transaction: {
        async create({ args, query }: any) {
          const updatedTransaction = (await query(args)) as any;
          await updateWallet("save", updatedTransaction);

          return updatedTransaction;
        },

        async update({ args, query }: any) {
          const prevTransaction = await prisma.transaction.findUnique({
            where: { id: args.where.id },
          });

          if (!prevTransaction) throw new Error("Transaction not found");
          const updatedTransaction = (await query(args)) as any;
          await updateWallet("update", prevTransaction, updatedTransaction);

          return updatedTransaction;
        },

        async delete({ args, query }: any) {
          const transactionToDelete = await prisma.transaction.findUnique({
            where: { id: args.where.id },
          });

          if (!transactionToDelete) throw new Error("Transaction not found");

          const result = await query(args);

          await updateWallet("delete", transactionToDelete);

          return result;
        },
      },
    },
  });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export default prisma
