import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#FFF8E9',
          100: '#FEEECC',
          200: '#FDD899',
          300: '#FBBC66',
          400: '#F7A040',
          500: '#F27503',
          600: '#D05902',
          700: '#AE4101',
          800: '#8C2D00',
          900: '#741F00',
        },
        secondary: {
          50: '#FBFAFA',
          100: '#F2F2F2',
          200: '#E6E6E6',
          300: '#B4B4B4',
          400: '#6A6A6A',
          500: '#070707',
          600: '#060505',
          700: '#050303',
          800: '#040202',
          900: '#030102',
        },
        error: {
          50: '#FFF2E9',
          100: '#FCE0CB',
          200: '#FABB98',
          300: '#F08A64',
          400: '#E15C3D',
          500: '#CE1C06',
          600: '#B10904',
          700: '#8E0109',
          800: '#720010',
          900: '#5F0014',
        },
        warning: {
          50: '#FDF0E6',
          100: '#F7D0B0',
          200: '#F4B98A',
          300: '#EE9954',
          400: '#EB8533',
          500: '#E66700',
          600: '#D15E00',
          700: '#914405',
          800: '#7F3900',
          900: '#612B00',
        },
        success: {
          50: '#EDFFEF',
          100: '#CAFACF',
          200: '#98F6AB',
          300: '#62E489',
          400: '#39CA73',
          500: '#08A858',
          600: '#059059',
          700: '#047855',
          800: '#02614E',
          900: '#015048',
        },
      },
      fontSize: {
        'xs': '14px',
        'sm': '16px',
        'base': '18px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '36px',
      },
      lineHeight: {
        'xs': '18px',
        'sm': '22px',
        'base': '26px',
        'lg': '28px',
        'xl': '34px',
        '2xl': '42px',
        '3xl': '46px',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
} satisfies Config;
