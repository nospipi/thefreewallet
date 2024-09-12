"use server"
const DATABASE = process.env.DATABASE //not working without "use server"

export interface IActionState {
  success: string | null
  error: string | null
}

export type FormFunction = (
  previousState: IActionState,
  formData: FormData
) => Promise<IActionState>

export type FormFunctionWithoutInput = () => Promise<IActionState>

interface IDatabaseActions {
  getWallets: () => Promise<any>
  getWallet: () => Promise<any>
  createWallet: FormFunction
  editWallet: FormFunction
  deleteWallet: FormFunctionWithoutInput
  getCategories: () => Promise<any>
  getWalletCategoriesStats: () => Promise<any>
  getCategory: (id: string) => Promise<any>
  getTransactions: () => Promise<any>
  getTransaction: () => Promise<any>
  createTransaction: FormFunction
  editTransaction: FormFunction
  deleteTransaction: FormFunctionWithoutInput
  // Add other action types here if needed
}

const getDbActions = async (): Promise<IDatabaseActions> => {
  if (DATABASE === "MONGODB") {
    return await import("@/databases/mongodb/server_actions")
  } else if (DATABASE === "POSTGRES") {
    return await import("@/databases/postgres/server_actions")
  } else {
    throw new Error("DATABASE environment variable is not set or is invalid")
  }
}

export const getWallets = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getWallets()
}

export const getWallet = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getWallet()
}

export const createWallet: FormFunction = async (previousState, formData) => {
  const actions = await getDbActions()
  return actions.createWallet(previousState, formData)
}

export const editWallet: FormFunction = async (previousState, formData) => {
  const actions = await getDbActions()
  return actions.editWallet(previousState, formData)
}

export const deleteWallet: FormFunctionWithoutInput = async () => {
  const actions = await getDbActions()
  return actions.deleteWallet()
}

export const getCategories = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getCategories()
}

export const getWalletCategoriesStats = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getWalletCategoriesStats()
}

export const getTransactions = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getTransactions()
}

export const getTransaction = async (): Promise<any> => {
  const actions = await getDbActions()
  return actions.getTransaction()
}

export const createTransaction: FormFunction = async (
  previousState,
  formData
) => {
  const actions = await getDbActions()
  return actions.createTransaction(previousState, formData)
}

export const editTransaction: FormFunction = async (
  previousState,
  formData
) => {
  const actions = await getDbActions()
  return actions.editTransaction(previousState, formData)
}

export const deleteTransaction: FormFunctionWithoutInput = async () => {
  const actions = await getDbActions()
  return actions.deleteTransaction()
}

// const getCategory = async (id: string): Promise<any> => {
//   try {
//     await connectDB()
//     const category = await CategoryModel.findById(id)
//     return category
//   } catch (error: any) {
//     return error?.message || "An error occurred"
//   }
// }

export const getCategory = async (id: string): Promise<any> => {
  const actions = await getDbActions()
  return actions.getCategory(id)
}
