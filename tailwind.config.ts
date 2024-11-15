import {nextui} from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#2a2c41',
        'background': '#fbfbfe',
        'primary': '#ef253c',
        'secondary': '#e4eaec',
        'accent': '#ef253c',
      },fontFamily: {
        'inter': ['var(--font-inter)'],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
} satisfies Config;
