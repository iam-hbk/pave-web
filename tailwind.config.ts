import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      gradientLoopForm: {
        "0%": {
          background:
            "linear-gradient(to right, var(--color-primary), var(--color-purple-600))",
        },
        "50%": {
          background:
            "linear-gradient(to right, var(--color-purple-600), var(--color-primary))",
        },
        "100%": {
          background:
            "linear-gradient(to right, var(--color-primary), var(--color-purple-600))",
        },
      },
      gradientLoopWizard: {
        "0%": {
          background:
            "linear-gradient(to right, var(--color-green-400), var(--color-red-500))",
        },
        "50%": {
          background:
            "linear-gradient(to right, var(--color-red-500), var(--color-green-400))",
        },
        "100%": {
          background:
            "linear-gradient(to right, var(--color-green-400), var(--color-red-500))",
        },
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f0bf1a",
          secondary: "#4e018f",
          accent: "#ffc501",
          neutral: "#2b3440",
          "base-100": "#fefefe",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        extend: {
          boxShadow: {
            "custom-xl":
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
export default config;
