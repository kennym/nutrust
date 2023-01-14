/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray-800': '#161616',
        'gray-700': '#2A2929',
        'gray-200': '#959595',
        'gray-500': '#1D1D1D',
        'gray-600': '#1B1B1B',
        'violet-500': '#CD70FF',
        'violet-600': '#C455FF',
        'green-500': '#EAFF96',
        'red-500': '#FE8D8D',
        'pro-100': '#727272'
      },
      spacing: {
        '2': '7px',
      },
      lineHeight: {
            '12': '60px',
        }
    }
  },
  plugins: [],
}
