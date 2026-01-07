import type { Metadata } from "next";
import { Geist, Geist_Mono, PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TJ Onboard PIDS",
  description: "Transjakarta on-board passenger information display system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ptSans.variable} font-pt`}>
        {children}
      </body>
    </html>
  );
}