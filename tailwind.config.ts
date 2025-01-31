import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#FFE8F0',
          '500': '#407AB8',
          DEFAULT: '#3B6790'
        },
        secondary: '#EFB036',
        black: {
          '100': '#333333',
          '200': '#141413',
          '300': '#7D8087',
          DEFAULT: '#000000'
        }
      },
      boxShadow: {
        '100': '2px 2px 0px 0px rgb(0, 0, 0)',
        '200': '2px 2px 0px 2px rgb(0, 0, 0)',
        '300': '2px 2px 0px 2px rgb(238, 43, 105)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
