import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "National Gym & Fitness Centre | Etobicoke",
  description: "Etobicoke's trusted gym for 27+ years. Unlimited memberships, no contracts, no sign-up fees. Serving Etobicoke, Rexdale, Malton and Toronto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-full bg-[#0b0b0b] font-light leading-[1.8]">{children}</body>
    </html>
  );
}
