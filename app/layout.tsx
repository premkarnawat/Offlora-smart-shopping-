import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
    metadataBase: new URL('https://offlora.com'),
    title: {
        default: "Offlora | Curated Affiliate Product Discovery",
        template: "%s | Offlora"
    },
    description: "A modern affiliate product discovery platform curated from Pinterest trends and expert reviews. Find aesthetics for your home, workspace, and lifestyle.",
    openGraph: {
        title: "Offlora | Curated Discoveries",
        description: "Discover aesthetic products you'll actually love.",
        url: "https://offlora.com",
        siteName: "Offlora",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
                <AnalyticsProvider />
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
