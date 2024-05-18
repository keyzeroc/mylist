/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-bg': 'rgba(var(--color-bg), <alpha-value>)',
        'color-gradient-1': 'rgba(var(--color-gradient-1), <alpha-value>)',
        'color-gradient-2': 'rgba(var(--color-gradient-2), <alpha-value>)',
        'color-content': 'rgba(var(--color-content), <alpha-value>)',
        'color-accent': 'rgba(var(--color-accent), <alpha-value>)',
        'color-accent-2': 'rgba(var(--color-accent-2), <alpha-value>)',
        'color-complementary-1': 'rgba(var(--color-complementary-1), <alpha-value>)'
      }
    },
  },
  plugins: [],
}

