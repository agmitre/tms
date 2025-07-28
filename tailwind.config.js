// tailwind.config.js
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                zain: ['"Zain"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}