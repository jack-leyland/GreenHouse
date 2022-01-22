module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'landingSearch': '1.1rem'
    },
    borderRadius: {
      'sm': '6px',
    },
    placeholderColor: {
      'darkGrey':'#444444',
    },
    extend: {
      colors:{
        'logoGreen':'#09E85E',
        'lightGreen':'#2AFC98',
        'emerald':'#16C172',
        'skyBlue':'#2DE1FC',
        'deepGreen': '#214F4B',
        'textGrey':'#B1B1B1',
        'darkGrey':'#989898',
        'lightGrey': '#f7f7f7'
      },
      fontFamily: {
        logoFont: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
};
