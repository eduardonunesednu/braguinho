/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'braguinho-blue': '#4da6ff',
                'braguinho-yellow': '#ffdd59',
                'braguinho-orange': '#ffaa55',
            },
            fontFamily: {
                'kids': ['"Fredoka"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
