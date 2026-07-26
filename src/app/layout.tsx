import type { Metadata } from "next";
import { Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://retenix-ai.vercel.app"),
  title: "Retenix AI | B2B Gym Churn & Retention Platform",
  description: "AI-powered member retention and churn prediction platform for fitness clubs.",
  openGraph: {
    title: "Retenix AI | Gym Retention Platform",
    description: "AI-powered member retention platform for gym owners.",
    url: "https://retenix-ai.vercel.app",
    siteName: "Retenix AI",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`scroll-smooth ${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-body bg-[#080810] text-white min-h-screen selection:bg-[#E8FF47]/25 selection:text-black">
        {children}
      </body>
    </html>
  );
}
