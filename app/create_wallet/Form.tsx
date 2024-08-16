// components/EntryForm.js
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import TextField from "@mui/material/TextField"

const EntryForm = () => {
  const [title, setTitle] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Here, you would typically send the title to your API or directly to your database
    // Example:
    // await fetch('/api/entries', { method: 'POST', body: JSON.stringify({ title }) });

    alert("Entry submitted: " + title)
    router.push("/") // Redirect to home or another desired page after submission
  }

  const handleCancel = () => {
    router.back() // Go back to the previous page
  }

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
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-theme-darkBrown text-white rounded-md shadow-sm hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default EntryForm
