"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Define the validation schema
const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required").nullable(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});

const EditTransactionForm = () => {
  const router = useRouter();

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
    console.log("Form values:", values);
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        amount: "",
      }}
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
              <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
            ) : null}
          </div>
          <div className="flex space-x-4 mt-6 justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-theme-darkBrown text-white rounded-md shadow-sm hover:bg-opacity-90"
            >
              Submit
            </button>

            <button
              onClick={() => router.back()}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditTransactionForm;
