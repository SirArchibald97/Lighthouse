/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        colors: {
            'common': '#FCFCFC',
            'uncommon': '#1EFC00',
            'rare': '#006FDA',
            'epic': '#A134EB',
            'legendary': '#FC7E00',
            'mythic': '#F64141'
        }
    },
  },
  plugins: [],
  darkMode: "selector"
}

