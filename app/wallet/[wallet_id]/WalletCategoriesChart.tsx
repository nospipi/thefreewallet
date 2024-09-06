"use client"

import React, { PureComponent } from "react"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Page A",
    uv: 15,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 30,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 5,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 8,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 13,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 1,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 6,
    pv: 4300,
    amt: 2100,
  },
]

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g"

  render() {
    return (
      <div className="overflow-x-auto flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={250} data={data}>
            <Bar dataKey="uv" fill="#8884d8" minPointSize={5} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

// import React, { PureComponent } from "react"
// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//   },
// ]

// export default class Example extends PureComponent {
//   static demoUrl = "https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5"

//   render() {
//     return (
//       <div className="overflow-x-auto flex-1">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart width={500} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="pv"
//               fill="#8884d8"
//               activeBar={<Rectangle fill="pink" stroke="blue" />}
//               minPointSize={5}
//             />
//             <Bar
//               dataKey="uv"
//               fill="#82ca9d"
//               activeBar={<Rectangle fill="gold" stroke="purple" />}
//               minPointSize={5}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     )
//   }
// }

// import * as React from "react"
// import Paper from "@mui/material/Paper"
// import Box from "@mui/material/Box"
// import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer"
// import { BarPlot } from "@mui/x-charts/BarChart"
// import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis"

// export default function WalletCategoriesChart() {
//   return (
//     <Paper sx={{ width: "100%", height: 250 }} elevation={3}>
//       <ResponsiveChartContainer
//         series={[
//           {
//             type: "bar",
//             data: [1, 2, 3, 2, 1],
//           },
//           {
//             type: "line",
//             data: [4, 3, 1, 3, 4],
//           },
//         ]}
//         xAxis={[
//           {
//             data: [
//               "Asdfsdf",
//               "Bsdfsdf",
//               "Csdfsdf",
//               "D",
//               "E",
//               "F",
//               "G",
//               "H",
//               "I",
//               "J",
//               "K",
//               "L",
//               "M",
//             ],
//             scaleType: "band",
//             id: "x-axis-id",
//           },
//         ]}
//       >
//         <BarPlot />
//         <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
//       </ResponsiveChartContainer>
//     </Paper>
//   )
// }

// import * as React from "react"
// import { BarChart } from "@mui/x-charts/BarChart"

// export default function WalletCategoriesChart({
//   data,
//   labels,
// }: {
//   data: number[]
//   labels: string[]
// }) {
//   return (
//     <div className="overflow-x-auto flex-1">
//       <BarChart
//         width={500}
//         height={250}
//         series={[{ data: data, id: "uvId" }]}
//         xAxis={[
//           {
//             data: labels,
//             scaleType: "band",
//             colorMap: {
//               type: "ordinal",
//               colors: ["#173B5C", "#A9ADB4"],
//             },
//           },
//         ]}
//         sx={{ overflowX: "scroll" }}
//       />
//     </div>
//   )
// }
