/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#1a2348',
                    dark: '#0f1f38',
                    light: '#2d4a6f',
                },
                orange: {
                    DEFAULT: '#f39c12',
                    dark: '#e67e22',
                    light: '#f5b041',
                },
            },
            fontFamily: {
                sans: ['"Oswald"', '"Oswald Fallback"', 'system-ui', 'sans-serif'],
                'oswald': ['"Oswald"', '"Oswald Fallback"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-down': 'slideDown 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
