import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: "Real Estate Utility",
  description: "Project Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div>
          <div className="z-5">
            <Navbar />
          </div>
          {children}

        </div>
      </body>
    </html>
  );
}
