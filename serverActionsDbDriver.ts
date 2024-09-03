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
  success: string | null
  error: string | null
}

export type CreateWalletFunction = (
  previousState: IActionState,
  formData: FormData
) => Promise<IActionState>

interface IDatabaseActions {
  createWallet: CreateWalletFunction
  // Add other action types here if needed
}

// Function to dynamically import the correct database module based on environment variable
const getDbActions = async (): Promise<IDatabaseActions> => {
  if (DATABASE === "MONGODB") {
    return await import("@/databases/mongodb/server_actions")
  } else if (DATABASE === "POSTGRES") {
    return await import("@/databases/postgres/server_actions")
  } else {
    throw new Error("DATABASE environment variable is not set or is invalid")
  }
}

// Export the createWallet function with proper typing
export const createWallet: CreateWalletFunction = async (
  previousState,
  formData
) => {
  const actions = await getDbActions()
  return actions.createWallet(previousState, formData)
}

// Export other functions similarly if needed:
// export const someOtherAction = ...
