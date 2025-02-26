/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "white-yellow": "linear-gradient(146deg, #FFFFFF 15%, #FFAA17 100%)",
      },
      colors: {
        red: {
          light: "#fca5a5",
          DEFAULT: "#ef4444",
          dark: "#b91c1c",
        },
        green: {
          light: "#86efac",
          DEFAULT: "#22c55e",
          dark: "#15803d",
        },
        blue: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        yellow: {
          light: "#fde047",
          DEFAULT: "#eab308",
          dark: "#ca8a04",
        },
        gray: "gray",
        main_dark: "#2E4052",
        main_gray: "#F1f1f1",
        main_orange: "#FFAA17",
        // Tambahkan warna dasar lainnya jika diperlukan
      },
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
};
