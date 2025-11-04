// tailwind.config.js
/** @type {import('tailwindcss').Config} */





module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /bg-\[var\(--.*\)\]/ },
    { pattern: /text-\[var\(--.*\)\]/ },
    { pattern: /border-\[var\(--.*\)\]\/.*/ },
  ],
  theme: {
    extend: {
      keyframes: {
        spinDots: {
          '0%, 100%': { boxShadow: '.2em 0 0 currentColor' },
          '12%': { boxShadow: '.2em .2em 0 currentColor' },
          '25%': { boxShadow: '0 .2em 0 currentColor' },
          '37%': { boxShadow: '-.2em .2em 0 currentColor' },
          '50%': { boxShadow: '-.2em 0 0 currentColor' },
          '62%': { boxShadow: '-.2em -.2em 0 currentColor' },
          '75%': { boxShadow: '0 -.2em 0 currentColor' },
          '87%': { boxShadow: '.2em -.2em 0 currentColor' },
        },
      },
      animation: {
        spinDots: 'spinDots 1s linear infinite',
      },

    },

  },
  plugins: [require('@tailwindcss/typography')],
};
