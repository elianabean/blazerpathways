import {heroui} from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#2a2c41',
        'background': '#fbfbfe',
        'primary': '#ef253c',
        'secondary': '#e4eaec',
        'warning': '#ffa500',
        'success': '#00ff00',
      },fontFamily: {
        'inter': ['var(--font-inter)'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
} satisfies Config;
