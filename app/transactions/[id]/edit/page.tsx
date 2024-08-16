"use client"

// pages/transactions/[id]/edit.tsx
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

// Define the validation schema
const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required").nullable(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
})

const TransactionEditPage: React.FC = () => {
  // Simulated initial values
  const initialValues = {
    description: "",
    date: "",
    amount: "",
  }

  //   useEffect(() => {
  //     // Simulate fetching transaction data
  //     // This should be replaced with actual data fetching logic
  //     if (id) {
  //       // Fetch transaction data based on ID and set form values
  //       // Example:
  //       // setInitialValues({
  //       //   description: 'Dinner at Restaurant',
  //       //   date: '2024-08-10',
  //       //   amount: 85.0,
  //       // });
  //     }
  //   }, [id])

  const handleSubmit = (values: any) => {
    // Replace with actual form submission logic
    console.log("Form values:", values)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Transaction
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.description && touched.description ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.date && touched.date ? (
                  <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount (€)
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.amount && touched.amount ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.amount}
                  </div>
                ) : null}
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
                <Link href={`/`}>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default TransactionEditPage
