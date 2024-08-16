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

const getWhoAmI = async () => {
  const response = await axios.get(`/api/whoAmI`)

  if (response.status !== 200) {
    throw new Error("Network response was not ok")
  }

  return response.data
}

export const useGetWhoAmI = () => {
  return useQuery({
    queryKey: ["WHO_AM_I"],
    queryFn: getWhoAmI,
    //every 5 seconds
    //refetchInterval: 5000,
    //every one minute
    //refetchInterval: 60000,
    //every 30 seconds
    refetchInterval: 5000,
  })
}

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
