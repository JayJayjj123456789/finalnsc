/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006767',
          hover: '#005555',
          container: '#008282',
          on: '#ffffff',
          'on-container': '#f3fffe',
          fixed: '#8cf3f3',
          'fixed-dim': '#6fd7d6',
        },
        surface: {
          DEFAULT: '#f8f9fa',
          dim: '#d9dadb',
          'container-lowest': '#ffffff',
          'container-low': '#f3f4f5',
          container: '#edeeef',
          'container-high': '#e7e8e9',
          'container-highest': '#e1e3e4',
        },
        'on-surface': '#191c1d',
        'on-surface-variant': '#3d4949',
        outline: {
          DEFAULT: '#6d7979',
          variant: '#bcc9c8',
        },
        secondary: {
          DEFAULT: '#5d5e61',
          container: '#e2e2e5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        soft: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.08)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        unit: '8px',
        gutter: '24px',
      },
      maxWidth: {
        container: '1280px',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
}