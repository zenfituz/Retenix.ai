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
  title: "Retenix | Gym Churn Prediction Engine",
  description: "Predict gym member churn before it happens with our 5-factor AI engine. Built for gym owners and trainers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-body bg-bg text-text-hi min-h-screen selection:bg-accent/25 selection:text-bg">
        {children}
      </body>
    </html>
  );
}
