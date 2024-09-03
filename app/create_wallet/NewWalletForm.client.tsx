"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TextField from "@mui/material/TextField"
import { toast } from "react-hot-toast"
import { createWallet, IActionState } from "@/serverActionsDbDriver"

//---------------------------------------------------------

const NewWalletForm = () => {
  const router = useRouter()
  const [state, action, isPending] = useActionState(createWallet, {
    success: null,
    error: null,
  } as IActionState)

  useEffect(() => {
    toast.dismiss();

    if (isPending) {
      toast.dismiss();
      toast.loading("Creating Wallet...");
    }
    if (state.success) {
      toast.dismiss();
      toast.success(state.success);
      router.back();
    }
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state.success, state.error, isPending, router]);

  return (
    <form action={action} className="space-y-6">
      <div>
        <TextField
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
          className="px-4 py-2 bg-theme-dark text-white rounded-md shadow-sm hover:bg-opacity-90 select-none"
        >
          Submit
        </button>
        <button
          onClick={() => {
            router.back()
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 select-none"
        >
          Back
        </button>
      </div>
    </form>
  )
}

export default NewWalletForm
