import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio de Thomas Ganaye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[url('../../public/images/pixel.png')] bg-cover bg-center">
      <body className={inter.className}>
    
        {children}
      </body>
    </html>
  );
}
