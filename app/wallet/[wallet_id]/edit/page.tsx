import EditWalletForm from "./EditWalletForm.client"
import { getWallet } from "@/serverActionsDbDriver"

//--------------------------------------------------------------

const AddEntryPage = async () => {
  const wallet = await getWallet()
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Edit Wallet
        </h2>
        <EditWalletForm id={wallet._id} title={wallet.title} />
      </div>
    </div>
  )
}

export default AddEntryPage
