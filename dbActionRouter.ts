const DATABASE = process.env.DATABASE as string;
console.log("DATABASE", typeof DATABASE);
import { createWallet as createWalletMongo } from "./databases/mongodb/server_actions";

function getServerActions() {
  switch (DATABASE) {
    case "MONGODB":
      return {
        createWallet: createWalletMongo,
      };
    // case 'mysql':
    //   return {
    //     //createWallet: createWalletSQL,
    //     //deleteWallet: ...
    //     // Add more MySQL-specific actions
    //   };

    default:
      throw new Error(`Unsupported DATABASE type: ${DATABASE}`);
  }
}

const serverActions = getServerActions();

export const { createWallet } = serverActions;
