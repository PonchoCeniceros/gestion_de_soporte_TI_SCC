/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#E9EDEB',
        baseDark: '#0B0B0B',
        baseLight: '#F3F4F6',
        primary: '#D9D2C5',
        secondary: '#8C8C87',
        terciary: '#3F403E',
        quaternary: '#FFFFFF',
        background: '#F3F4F6',
        offline: '#D9A38F',
        online: '#86EFAC',
        darkSec: '#2F4A5B',
        lightSec: '#4F9AA6',
        excel: '#21A366',
      },
    },
  },
  plugins: [],
}
