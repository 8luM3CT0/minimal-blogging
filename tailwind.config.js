module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'google-sans': ['Open Sans', 'sans-serif'],
        'hind-font': ['Hind', 'sans-serif'],
        'font-robot': ['Roboto', 'sans-serif'],
        'robot-condensed': ['Roboto Condensed', 'sans-serif'],
        'robot-slab': ['Roboto Slab', 'serif'],
        'source-serif': ['Source Serif Pro', 'serif'],
        'ubuntu-mono': ['Ubunto Mono', 'monospace'],
        'ubunto': ['Ubuntu', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'ibm-sans': ['IBM Plex Sans', 'sans-serif'],
        'ibm-mono': ['IBM Plex Mono', 'monospace'],
        'path-ex': ['Pathway Extreme', 'sans-serif'],
        'fira-sans': ['Fira Sans', 'sans-serif'],
        'montserr': ['Montserrat', 'sans-serif'],
        'mont-sub': ['Montserrat Subrayada', 'sans-serif']
      },
      backgroundImage: theme => ({
        'headerpic':
        'url(https://i.pinimg.com/originals/82/61/db/8261dbfb8be94c32d494ff96fe6869ab.jpg)',
        'study': 
        'url(https://i.pinimg.com/564x/d9/98/e3/d998e389cec1951f4d6a5d7f4f556f90.jpg)',
        'placeholder':
        'url(https://i.pinimg.com/564x/c7/88/8b/c7888b5308bc5c5c8e120c5b895e5982.jpg)',
        'techie':
        'url(https://i.pinimg.com/564x/15/68/8d/15688d5c314545f0e800665139f14d34.jpg)' 
      }),
      animation: {
        shine: 'shine 1.2s',
      },
      keyframes: {
        shine: {
          "100%": {left: "125%"},
        },
      },
      gridTemplateColumns: {
        sidebar: "300px auto"
      },
      gridTemplateRows: {
        header: "64px auto"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography')
  ]
}