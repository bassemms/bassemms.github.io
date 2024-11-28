import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi-variable",
});

export const metadata: Metadata = {
  title: "Bassem MSAYIF / Software Engineer",
  description: "Bassem MSAYIF's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshiVariable.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
