import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-body bg-bg text-text-hi min-h-screen selection:bg-accent/25 selection:text-bg">
        {children}
      </body>
    </html>
  );
}
