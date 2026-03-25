import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        sidebar: '#1E293B',
        gold: '#C9A84C',
        card: '#1E293B',
        'card-border': '#334155',
      },
    },
  },
  plugins: [],
}
export default config
