// components/EntryForm.js
"use client";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import createWallet from "./WalletForm.server";

//---------------------------------------------------------

const WalletForm = () => {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const createdCallBackSuccess = searchParams.get("wallet_created_success");
  const createdCallBackError = searchParams.get("wallet_created_error");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.success(`Wallet ${title} created successfully`);
    setTitle("");
    //router.push("/create_wallet?success=true");
  };

  //createdCallBackTitle && toast.success(`Wallet ${createdCallBackTitle} created successfully`);
  useEffect(() => {
    if (createdCallBackSuccess) {
      toast.success(createdCallBackSuccess, {
        id: "wallet-created",
      });
    }

    if (createdCallBackError) {
      toast.error(createdCallBackError, {
        id: "wallet-creation-failed",
      });
    }
  }, [createdCallBackSuccess, createdCallBackError]);

  return (
    <form
      action={createWallet}
      //onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <TextField
          // id="title"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          name="title"
          variant="filled"
          fullWidth
          required
          label="Title"
          sx={{
            background: "white",
          }}
        />
      </div>
      <div className="flex space-x-4 justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-theme-darkBrown text-white rounded-md shadow-sm hover:bg-opacity-90"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default WalletForm;
