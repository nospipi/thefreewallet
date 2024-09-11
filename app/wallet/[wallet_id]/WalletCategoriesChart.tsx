// "use client"

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
//         sx={{ "&&": { touchAction: "auto" } }}
//         //https://github.com/mui/mui-x/issues/13885
//       />
//     </div>
//   )
// }

//--------------------------------------------

"use client"
import { useMeasure } from "react-use"
import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  LabelList,
  Cell,
  Legend,
} from "recharts"

const chartData = [
  { title: "ΛΟΓΑΡΙΑΣΜΟΙ", amount: 10 },
  { title: "Another", amount: 150 },
  { title: "Example", amount: 200 },
  { title: "Test", amount: 500 },
  { title: "h45ty", amount: 150 },
  { title: "ABCDEFGHIJKLMNOP", amount: 10 },
  { title: "Tesvcxbt", amount: 500 },
  { title: "fdfg", amount: 500 },
  { title: "etruetruy", amount: 51 },
  { title: "kjlhjkl", amount: 150 },
  { title: "nm,.n", amount: 200 },
  { title: "456365g", amount: 500 },
  { title: "mmmvnb", amount: 500 },
  { title: "wwwqwq", amount: 500 },
  { title: "6665456", amount: 50 },
  // { title: "operations@getawaysgreece.com", amount: 150 },
  // { title: "nm,.rtertn", amount: 200 },
  // { title: "4563234er65g", amount: 500 },
]

const calculateChartHeight = (dataLength: number) => {
  const baseHeight = 100
  const incrementRate = 25 // Height increase per additional data point
  if (dataLength < 3) {
    return baseHeight
  }
  return baseHeight + (dataLength - 2) * incrementRate
}

const WalletCategoriesChart = () => {
  const [ref, { width }] = useMeasure()
  const height = calculateChartHeight(chartData.length)

  // Function to determine color based on index
  const getBarColor = (index: number) => {
    return index % 2 === 0 ? "#cfd7e9" : "rgb(236 236 236)"
  }

  const getLabelColor = (index: number) => {
    return index % 2 === 0 ? "white" : "black"
  }

  // const CustomLabel = (props: any) => {
  //   console.log("props", props)
  //   return (
  //     <text
  //       x={props.width + 25}
  //       y={props.y}
  //       dy={props.height / 1.6}
  //       fill={getLabelColor(props.index)}
  //       textAnchor="right"
  //       fontSize={8}
  //       fontFamily="Arial"
  //     >
  //       {props.value}
  //     </text>
  //   )
  // }

  return (
    <div
      //@ts-expect-error
      ref={ref}
      style={{
        //border: "1px solid black",
        overflow: "auto",
        marginTop: "10px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          width={width}
          height={height}
          data={chartData}
          barGap={10}
          barCategoryGap={2}
          layout="vertical"
          margin={{ top: 25, right: 0, left: 50, bottom: 25 }}
          style={{
            //border: "1px solid red",
            //padding: "5px",
            overflow: "visible",
          }}
        >
          <XAxis dataKey="amount" />
          <YAxis dataKey="title"></YAxis>
          <Tooltip />

          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Bar
            dataKey="amount"
            //alternate fill color
            fill="#8884d8"
            minPointSize={(value: number) => {
              return value
            }}
            max={300}
            // label={{
            //   position: "right",
            //   fill: "black",
            //   value: "dsf",
            // }}
            radius={[0, 5, 5, 0]}
          >
            <LabelList
              dataKey="title"
              position="left"
              //angle={-10}
              //offset={0}
              fontSize={10}
              fill="#30343f"
              formatter={(value: any) => {
                return value.length > 7 ? value.substring(0, 6) + ".." : value
              }}
            />
            <LabelList
              dataKey="amount"
              position="insideRight"
              //angle={-10}
              fontSize={10}
              fill="black"
              //content={<CustomLabel />}
            />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WalletCategoriesChart

// import React from "react"
// import { Chart, AxisOptions } from "react-charts"

// const chartData = [
//   { title: "SUPER MARKET", amount: 100 },
//   { title: "UTILITIES", amount: 50 },
// ]

// type MyDatum = { title: string; amount: number }

// const formattedData = [
//   {
//     label: "Amounts",
//     data: chartData.map((item) => ({
//       title: item.title,
//       amount: item.amount,
//     })),
//   },
// ]

// const WalletCategoriesChart = () => {
//   // Primary axis for months (categories)
//   const primaryAxis = React.useMemo(
//     (): AxisOptions<MyDatum> => ({
//       showGrid: false,
//       position: "left",
//       getValue: (datum) => datum.title, // Extract month for the primary axis
//     }),
//     []
//   )

//   // Secondary axis for desktop values (numbers)
//   const secondaryAxes = React.useMemo(
//     (): AxisOptions<MyDatum>[] => [
//       {
//         showGrid: false,
//         position: "bottom",
//         getValue: (datum) => datum.amount, // Extract desktop value for the secondary axis
//       },
//     ],
//     []
//   )

//   return (
//     <div style={{ width: "100%", height: "500px", overflow: "auto" }}>
//       <Chart
//         options={{
//           data: formattedData,
//           primaryAxis,
//           secondaryAxes,
//         }}
//       />
//     </div>
//   )
// }

// export default WalletCategoriesChart
