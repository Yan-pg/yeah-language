import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "animation-pulse": {
          "0%, 100%": { transform: "scale(1);" },
          "50%": { transform: "scale(0.95);" },
        },
      },
      animation: {
        "pulse-click": "animation-pulse 0.5s linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      boxShadow: {
        "button-primary": "0px 4px 0px 0px #489D26;",
        "button-secondary": " 0px 2px 0px 0px #E1E1E1;",
        "button-error": "0px 4px 0px 0px #EE282D;",
      },

      gridTemplateRows: {
        challenge: "100px 1fr 136px;",
      },
    },
    colors: {
      ...colors,
      "gray-primary": "#E1E1E1",
      "gray-secondary": "#A6A6A6",
      "green-primary": "#58CC02",
      "green-dark": "#35B023",
      "green-secondary": "#42C62F",
      "purple-primary": "#CE82FF",
      "red-light": "#FFDADC",
      "red-dark": "#EE282D",
      "error-button": "#FF4347",
      success: "#D7FFB8",
      blue: {
        primary: "#1CB0F6",
      },
      units: {
        green: "#00CD9C",
        "orange-ready": "#CC6302",
        "orange-not-ready": "#CA8E57",
      },
    },

    keyframes: {
      slideDownAndFade: {
        from: { opacity: "0", transform: "translateY(-2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: "0", transform: "translateX(2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: "0", transform: "translateY(2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: "0", transform: "translateX(-2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
    },
    animation: {
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  plugins: [],
};
export default config;
