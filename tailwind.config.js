/** @type {import('tailwindcss').Config} */

import {createRequire} from 'module';
const require = createRequire(import.meta.url);

export default {
  content: [
      "./src/**/*.{html,js,jsx}",
      "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

