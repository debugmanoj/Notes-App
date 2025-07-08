import typography from "@tailwindcss/typography";

export default {
  darkMode: 'class', // ✅ important!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
plugins: [typography],
}
