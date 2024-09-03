"use client";

import { useQuery } from "@tanstack/react-query";
//import axios from "axios";
import { getCategories } from "./server_actions";

//--------------------------------------------------------------

// export const useGetTransactions = () => {
//   return useQuery({
//     queryKey: ["TRANSACTIONS"],
//     queryFn: () => axios.get(`/api/transactions`),
//   });
// };

// export const useGetTransaction = (id: string) => {
//   return useQuery({
//     queryKey: ["TRANSACTION", id],
//     queryFn: () => axios.get(`/api/transaction/${id}`),
//   });
// };

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: getCategories,
    initialData: [],
  });
};
