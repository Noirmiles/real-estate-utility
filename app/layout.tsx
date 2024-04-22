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
        <Navbar/>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          ></ThemeProvider>
          {children}
        </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
