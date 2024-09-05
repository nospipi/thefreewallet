import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scale: {
        "102": "1.02",
        "103": "1.03",
      },
      variants: {
        extend: {
          scale: ["hover"],
        },
      },
      colors: {
        theme: {
          dark: "#30343f",
          white: "#fafaff",
          google: "#f0f3f8",
          darkWhite: "#F1F1F1",
          lightBlue: "#B8C9FF",
          blue: "#273469",
          darkBlue: "#1e2749",
          darkGreen: "rgb(21 153 21)",
          indianRed: "indianred",
          gradient: "linear-gradient(90deg, #273469 0%, #1e2749 100%)",
        },
      },
    },
  },
  plugins: [],
}
export default config
