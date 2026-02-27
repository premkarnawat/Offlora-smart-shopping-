import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#8FAF8B", // Pastel Green / Olive
                    secondary: "#3E5F44", // Deep Green
                    text: "#2F2F2F", // Charcoal gray
                    bg: "#F9FAF9", // Light green tint / Off-white
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
};
export default config;
