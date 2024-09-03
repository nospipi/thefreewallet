"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import { editTransaction, IActionState } from "@/serverActionsDbDriver";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//---------------------------------------------------------

const NewTransactionForm = ({ transaction, categories }: any) => {
  const parsedTransaction = JSON.parse(transaction);
  const parsedCategories = JSON.parse(categories);
  const router = useRouter();

  const [state, action, isPending] = useActionState(editTransaction, {
    success: null,
    error: null,
  } as IActionState);

  useEffect(() => {
    toast.dismiss();

    if (isPending) {
      toast.dismiss();
      toast.loading("Updating Transaction...");
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

    return () => {
      toast.dismiss();
    };
  }, [state.success, state.error, isPending, router]);

  //---------------------------------------------------------

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="id" value={parsedTransaction._id} />
      <input
        type="hidden"
        name="wallet_id"
        value={parsedTransaction.wallet_id}
      />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={parsedTransaction.type}
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
          defaultValue={parsedTransaction.category_id}
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
          defaultValue={parsedTransaction.description}
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
            defaultValue={parsedTransaction.amount}
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
            defaultValue={parsedTransaction.date}
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

export default NewTransactionForm;
