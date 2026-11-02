/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0c0f0d",
        surface: "#111612",
        "surface-2": "#171d18",
        line: "#293129",
        ink: "#edf2ea",
        muted: "#98a29a",
        lime: { DEFAULT: "#c8ff4d", dim: "#5e762c" },
        ember: "#ff9d4d"
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"]
      }
    }
  },
  plugins: []
};