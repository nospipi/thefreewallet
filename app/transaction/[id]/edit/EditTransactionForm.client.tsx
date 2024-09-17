"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TextField from "@mui/material/TextField"
import { toast } from "react-hot-toast"
import { editTransaction, IActionState } from "@/lib/serverActionsDbDriver"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

//---------------------------------------------------------

const EditTransactionForm = ({ transaction, categories }: any) => {
  const parsedTransaction = JSON.parse(transaction)
  const parsedCategories = JSON.parse(categories)
  const [categoriesList, setCategoriesList] = useState(parsedCategories)
  const [newCategory, setNewCategory] = useState<string>("")
  const [newCategoryFieldShown, setNewCategoryFieldShown] =
    useState<boolean>(false)
  const router = useRouter()

  const [state, action, isPending] = useActionState(editTransaction, {
    success: null,
    error: null,
  } as IActionState)

  useEffect(() => {
    toast.dismiss()

    if (isPending) {
      toast.dismiss()
      toast.loading("Updating Transaction...")
    }
    if (state.success) {
      toast.dismiss()
      toast.success(state.success)
      router.back()
    }
    if (state.error) {
      toast.dismiss()
      toast.error(state.error)
    }

    return () => {
      toast.dismiss()
    }
  }, [state.success, state.error, isPending, router])

  //---------------------------------------------------------

  return (
    <form action={action} autoComplete="off" className="space-y-2">
      <input type="hidden" name="id" value={parsedTransaction.id} />
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
          {!newCategoryFieldShown && (
            <MenuItem
              value=""
              onClick={() => setNewCategoryFieldShown(true)}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddIcon
                sx={{
                  marginRight: "5px",
                }}
                fontSize="small"
              />
              <span>Add new category</span>
            </MenuItem>
          )}
          {categoriesList.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {newCategoryFieldShown && (
        <div className="flex flex-row w-full gap-2">
          <TextField
            variant="filled"
            fullWidth
            label="Type new category"
            sx={{
              background: "white",
            }}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{
              padding: "0",
              width: "50px",
              height: "50px",
            }}
            color="success"
            onClick={() => {
              const randomId = Math.random().toString(36).substring(7)
              setCategoriesList([
                ...categoriesList,
                {
                  _id: `NEW_CATEGORY=${newCategory}_${randomId}`,
                  title: newCategory,
                },
              ])
              setNewCategoryFieldShown(false)
              setNewCategory("")
            }}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              setNewCategoryFieldShown(false)
              setNewCategory("")
            }}
            sx={{
              padding: "0",
              width: "50px",
              height: "50px",
            }}
            color="error"
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
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
            slotProps={{ htmlInput: { min: 0.01, step: 0.001 } }}
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
          type="button"
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

export default EditTransactionForm
