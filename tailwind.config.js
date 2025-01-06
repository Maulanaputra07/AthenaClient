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
        'white-yellow': 'linear-gradient(146deg, #FFFFFF 15%, #FFAA17 100%)',
      },
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}

