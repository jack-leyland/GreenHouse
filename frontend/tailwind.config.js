module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    placeholderColor: {
      'darkGrey':'#444444',
    },
    extend: {
      fontSize: {
        'landingSearch': '1.1rem'
      },
      borderRadius: {
        'default': '6px',
      },
      colors:{
        'logoGreen':'#09E85E',
        'lightGreen':'#2AFC98',
        'emerald':'#16C172',
        'skyBlue':'#2DE1FC',
        'deepGreen': '#214F4B',
        'textGrey':'#B1B1B1',
        'darkGrey':'#989898',
        'lightGrey': '#f7f7f7',
        'epcG': '#e9153b',
        'epcF': '#ef8023',
        'epcE': '#fcaa65',
        'epcD': '#ffd500',
        'epcC': '#8dce46',
        'epcB': '#19b459',
        'epcA': '#008054'
      },
      fontFamily: {
        logoFont: ['Inter', 'sans-serif'],
      },
      animation: {
        fade: 'fadeInGrow 2s ease-in-out',
        shake: 'shake .5s linear'
      },
      keyframes: theme => ({
        fadeInGrow: {
          '0%': { opacity: 0, transform: "scale(0.1)" },
          '100%': { opacity: 1, transform: "scale(1)" },
        },
        shake: {
          '8%': {
            transform: "translateX(-10px)"
          },
          '25%': {
            transform: "translateX(10px)"
          },
          '41%': {
            transform: "translateX(-10px)"
          },
          '58%': {
              transform: "translateX(10px)"
          },
          '75%': {
              transform: "translateX(-5px)"
          },
          '92%': {
              transform: "translateX(5px)"
          },
          '100%': {
              transform: "translateX(0)"
          }
      }
      }),
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
};
