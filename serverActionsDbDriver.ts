"use server"

//const DATABASE = process.env.NEXT_PUBLIC_DATABASE //working without "use server"
const DATABASE = process.env.DATABASE //not working without "use server"

// console.log(`Using ${DATABASE} database`)

// let moduleToExport: any

// if (DATABASE === "MONGODB") {
//   moduleToExport = await import("@/databases/mongodb/server_actions")
// } else if (DATABASE === "POSTGRES") {
//   moduleToExport = await import("@/databases/mongodb/server_actions")
// } else {
//   throw new Error("DATABASE environment variable is not set or is invalid")
// }

// console.log(`Using ${moduleToExport} as database actions`)

// export default moduleToExport



export interface IActionState {
  success: string | null;
  error: string | null;
}

export type FormFunction = (
  previousState: IActionState,
  formData: FormData
) => Promise<IActionState>;

export type FormFunctionWithoutInput = () => Promise<IActionState>;

interface IDatabaseActions {
  getWallet: () => Promise<any>;
  createWallet: FormFunction;
  deleteWallet: FormFunctionWithoutInput;
  getCategories: () => Promise<any>;
  getTransactions: () => Promise<any>;
  getTransaction: () => Promise<any>;
  createTransaction: FormFunction;
  editTransaction: FormFunction;
  deleteTransaction: FormFunctionWithoutInput;
  // Add other action types here if needed
}

const getDbActions = async (): Promise<IDatabaseActions> => {
  if (DATABASE === "MONGODB") {
    return await import("@/databases/mongodb/server_actions");
  } else if (DATABASE === "POSTGRES") {
    return await import("@/databases/postgres/server_actions");
  } else {
    throw new Error("DATABASE environment variable is not set or is invalid");
  }
};

export const getWallet = async (): Promise<any> => {
  const actions = await getDbActions();
  return actions.getWallet();
};

export const createWallet: FormFunction = async (previousState, formData) => {
  const actions = await getDbActions();
  return actions.createWallet(previousState, formData);
};

export const deleteWallet: FormFunctionWithoutInput = async () => {
  const actions = await getDbActions();
  return actions.deleteWallet();
};

export const getCategories = async (): Promise<any> => {
  const actions = await getDbActions();
  return actions.getCategories();
};

export const getTransactions = async (): Promise<any> => {
  const actions = await getDbActions();
  return actions.getTransactions();
};

export const getTransaction = async (): Promise<any> => {
  const actions = await getDbActions();
  return actions.getTransaction();
};

export const createTransaction: FormFunction = async (
  previousState,
  formData
) => {
  const actions = await getDbActions();
  return actions.createTransaction(previousState, formData);
};

export const editTransaction: FormFunction = async (
  previousState,
  formData
) => {
  const actions = await getDbActions();
  return actions.editTransaction(previousState, formData);
};

export const deleteTransaction: FormFunctionWithoutInput = async () => {
  const actions = await getDbActions();
  return actions.deleteTransaction();
};