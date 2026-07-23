import type { Metadata } from "next";
import { Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/language-context";
import { ActivityLogProvider } from "@/context/activity-log-context";
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
  title: "Retenix AI | Gym Churn Prediction & Retention Engine",
  description: "Predict gym member churn 14 days in advance with 5-factor AI analysis. Increase gym retention and MRR.",
  openGraph: {
    title: "Retenix AI | Gym Churn Prediction Engine",
    description: "AI-powered member retention platform for gym owners and personal trainers.",
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
      <body className="antialiased font-body bg-bg text-text-hi min-h-screen selection:bg-accent/25 selection:text-bg">
        <LanguageProvider>
          <ActivityLogProvider>
            {children}
          </ActivityLogProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
