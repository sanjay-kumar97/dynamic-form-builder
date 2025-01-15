import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const urbanist = localFont({
  src: "./fonts/Urbanist.ttf",
  variable: "--font-urbanist",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dynamic Form Builder",
  description: "Powered by Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${inter.variable} ${urbanist.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
