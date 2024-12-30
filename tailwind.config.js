/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      extend:{
        boxShadow: {
          'bottom-only': '0px 4px 6px rgba(0, 0, 0, 0.5)'
        }
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}

