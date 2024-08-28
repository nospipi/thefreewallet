import WalletForm from "./WalletFormClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//--------------------------------------------------------------

const AddEntryPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Add a New Wallet
        </h2>
        <WalletForm />
      </div>
    </div>
  );
};

export default AddEntryPage;
