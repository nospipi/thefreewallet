// components/EntryForm.js
"use client";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";

//---------------------------------------------------------

const WalletForm = () => {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.success(`Wallet ${title} created successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <TextField
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          //onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WalletForm;
