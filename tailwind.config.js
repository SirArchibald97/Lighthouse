import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        colors: {
            'common': '#FCFCFC',
            'uncommon': '#1EFC00',
            'rare': '#006FDA',
            'epic': '#A134EB',
            'legendary': '#FC7E00',
            'mythic': '#F64141',
            primary: { 50: '#FFF5F2', 100: '#FFF1EE', 200: '#FFE4DE', 300: '#FFD5CC', 400: '#FFBCAD', 500: '#FE795D', 600: '#EF562F', 700: '#EB4F27', 800: '#CC4522', 900: '#A5371B'},
        }
    },
  },
  plugins: [
    flowbitePlugin
  ],
  darkMode: "selector"
}

