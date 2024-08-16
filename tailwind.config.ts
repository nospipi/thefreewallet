import type { Config } from "tailwindcss";

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
          lightPeach: "#f1d4b4",
          cream: "#fcf5ed",
          darkBrown: "#49392a",
          offWhite: "#fefdf8",
          lightGray: "#fbfbfb",
          secondaryText: "#a37b4f",
          darkGreen: "rgb(21 153 21)",
          indianRed: "indianred",
        },
      },
    },
  },
  plugins: [],
};
export default config;
