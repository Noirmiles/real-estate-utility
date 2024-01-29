import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-grey-50 dark:bg-slate-800">
          {/*Insert Main and Navbar call after its made */}
          {children}
      </body>
    </html>
  );
}
