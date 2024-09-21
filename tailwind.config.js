/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        textPrimary: '#1f2937',
        textSecondary: '#9ca3af',
        textHover: '#ef4444',
        bgButton: '#ef4444',
        bgHoverButton: '#dc2626',
        ringButton: '#fca5a5'
      }
    },
  },
  plugins: [],
}

