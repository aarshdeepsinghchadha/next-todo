import type { Metadata } from "next";
import { Geist, Geist_Mono, Special_Elite } from "next/font/google"; 
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  subsets: ['latin'], 
  weight: "400",
  variable: '--font-special-elite',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${specialElite.variable} ${geistSans.variable} ${geistMono.variable} antialiased`} // Apply Special Elite font
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
