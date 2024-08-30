"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import createWallet from "./WalletForm.server";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import { IActionState } from "./WalletForm.server";

//---------------------------------------------------------

const WalletForm = () => {
  const [state, action, isPending] = useActionState(createWallet, {
    success: null,
    error: null,
  } as IActionState);

  console.log("state", state);
  console.log("isPending", isPending);

  const router = useRouter();

  return (
    <form
      action={action}
      //onSubmit={handleSubmit}
      className="space-y-6"
    >
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
        <LoadingButton
          variant="contained"
          type="submit"
          //className="px-4 py-2 bg-theme-darkBrown text-white rounded-md shadow-sm hover:bg-opacity-90"
          loading={isPending}
          size="small"
          color="success"
        >
          Submit
        </LoadingButton>

        <Button
          onClick={() => {
            router.push("/");
          }}
          variant="outlined"
          size="small"
          color="inherit"
        >
          Back
        </Button>
      </div>
    </form>
  );
};

export default WalletForm;
