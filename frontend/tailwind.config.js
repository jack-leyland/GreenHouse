module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      animation: {
        fade: 'fadeInGrow 2s ease-in-out',
      },

      keyframes: theme => ({
        fadeInGrow: {
          '0%': { opacity: 0, transform: "scale(0.1)" },
          '100%': { opacity: 1, transform: "scale(1)" },
        },
      }),
    }
  },
  plugins: [],
};
