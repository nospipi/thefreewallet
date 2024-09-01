"use client"

import { useActionState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import { createTransaction } from "./NewTransactionForm.server_actions";
import { IActionState } from "./NewTransactionForm.server_actions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//---------------------------------------------------------

const NewTransactionForm = ({ categories }: any) => {
  const parsedCategories = JSON.parse(categories);
  const router = useRouter();
  const params = useParams();
  const wallet_id = params.wallet_id as string;

  const [state, action, isPending] = useActionState(createTransaction, {
    success: null,
    error: null,
  } as IActionState);

  useEffect(() => {
    toast.dismiss();

    if (isPending) {
      toast.dismiss();
      toast.loading("Creating Transaction...");
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
    <form action={action} className="space-y-2">
      <input type="hidden" name="wallet_id" value={wallet_id} />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="type"
        >
          <FormControlLabel
            value="income"
            control={<Radio required />}
            label="Income"
          />
          <FormControlLabel
            value="expense"
            control={<Radio required />}
            label="Expense"
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          name="category_id"
          required
          defaultValue=""
          label="Category"
        >
          {parsedCategories.map((category: any) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="space-y-2">
        <TextField
          name="description"
          variant="filled"
          fullWidth
          required
          label="Description"
          sx={{
            background: "white",
          }}
        />
        <div
          //flex full width row gap 1
          className="flex flex-row w-full gap-2"
        >
          <TextField
            name="amount"
            variant="filled"
            fullWidth
            required
            label="Amount €"
            sx={{
              background: "white",
            }}
            type="number"
            slotProps={{ htmlInput: { min: 1 } }}
          />
          <TextField
            name="date"
            fullWidth
            required
            sx={{
              background: "white",
            }}
            type="date"
            label="Date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
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
            router.back();
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 select-none"
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default NewTransactionForm
