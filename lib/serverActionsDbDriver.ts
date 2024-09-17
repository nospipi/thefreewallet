const DATABASE = process.env.DATABASE

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
  getTransaction: (id: string) => Promise<any>
  createTransaction: FormFunction
  editTransaction: FormFunction
  deleteTransaction: FormFunctionWithoutInput
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

export const getTransaction = async (id: string): Promise<any> => {
  const actions = await getDbActions()
  return actions.getTransaction(id)
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

export const getCategory = async (id: string): Promise<any> => {
  const actions = await getDbActions()
  return actions.getCategory(id)
}
