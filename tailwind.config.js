/** @type {import('tailwindcss').Config} */

import {createRequire} from 'module';

const require = createRequire(import.meta.url);

export default {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: ["light", "dark"],
    },
}

