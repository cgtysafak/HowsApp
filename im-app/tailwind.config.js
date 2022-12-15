const { height } = require('@mui/system')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen/90': '90vh',
      },
      width: {
        'screen/90': '90vw',
      },
      minHeight: {
        '1/10': '10vh',
      },  
      minWidth: {
        '1/10': '10vw',
        '100px': '100px',
      },
      flex: {
        'basis-65': '0 0 66%',
      },
    },
  },
  plugins: [],
}
