"use client"

import * as React from "react"
import { BarChart } from "@mui/x-charts/BarChart"

export default function WalletCategoriesChart({
  data,
  labels,
}: {
  data: number[]
  labels: string[]
}) {
  return (
    <div className="overflow-x-auto">
      <BarChart
        width={500}
        height={250}
        series={[{ data: data, id: "uvId" }]}
        xAxis={[
          {
            data: labels,
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              colors: ["#173B5C", "#A9ADB4"],
            },
          },
        ]}
      />
    </div>
  )
}
