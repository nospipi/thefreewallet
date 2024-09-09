"use client"

// import * as React from "react"
// import Paper from "@mui/material/Paper"
// import Box from "@mui/material/Box"
// import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer"
// import { BarPlot } from "@mui/x-charts/BarChart"
// import { LinePlot } from "@mui/x-charts/LineChart";
// import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis"

// export default function WalletCategoriesChart({
//   data,
//   labels,
// }: {
//   data: number[];
//   labels: string[];
// }) {
//   return (
//     <Paper sx={{ width: "100%", height: 250 }} elevation={3}>
//       <ResponsiveChartContainer
//         series={[
//           {
//             type: "bar",
//             data: data,
//           },
//         ]}
//         xAxis={[
//           {
//             data: labels,
//             scaleType: "band",
//             id: "x-axis-id",
//           },
//         ]}
//         colors={["#173B5C", "#A9ADB4"]}
//       >
//         <BarPlot />
//         <LinePlot />
//         <ChartsXAxis label="Categories" position="bottom" axisId="x-axis-id" />
//       </ResponsiveChartContainer>
//     </Paper>
//   );
// }

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
    <div className="overflow-x-auto flex-1">
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
        sx={{ "&&": { touchAction: "auto" } }}
        //https://github.com/mui/mui-x/issues/13885
      />
    </div>
  )
}
