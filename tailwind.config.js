/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: ["./*.html",
  "./src/**/*.{vue,js,ts,jsx,tsx"],
  theme: {
    extend: {
      spacing:{
        "big":"48rem"
      }
    },
      screens:{
        sm:"480px",
        md:"768px",
        lg:"1024px",
        xl:"1280px"
      },
    // fontFamily:{
    //   nunito:['Nunito Sans', "sans-serif"]
    // }
  },
  plugins: [],
}

