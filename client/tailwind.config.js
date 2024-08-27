/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Specify where Tailwind should look for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: '#131a34',
        primaryLight: '#1d273f',
        primaryLighter: '#244657',
        secondary: '#d42f5a',
        secondaryLight: '#940a48e5',
        white: '#e8e7d1',
      }
    },
    fontFamily: {
      sans: ['Special Elite', 'ui-sans-serif', 'system-ui'],
      mono: ['monospace', 'SFMono-Regular'],
    }
  },
  plugins: [],
}
