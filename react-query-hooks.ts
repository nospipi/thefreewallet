import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// const fetchAvailabilityZones = async (date: string) => {
//   const response = await fetch(`/server/api/availability_zones?date=${date}`)
//   if (!response.ok) {
//     throw new Error("Network response was not ok")
//   }
//   return response.json()
// }

//with axios

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["TRANSACTIONS"],
    queryFn: () => axios.get(`/api/transactions`),
  })
}

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ["TRANSACTION", id],
    queryFn: () => axios.get(`/api/transaction/${id}`),
  })
}
