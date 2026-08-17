import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./embla.css";
import ReduxProvider from "./ReduxProvider";

const satoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi-variable",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bassemms.dev"),
  title: "Bassem Msayif | Software Engineer",
  description: "Software engineer in France building thoughtful, reliable products across front end, back end, and infrastructure.",
  openGraph: {
    title: "Bassem Msayif | Software Engineer",
    description: "Full-stack engineer turning complex problems into thoughtful, reliable products.",
    type: "website",
    images: [{ url: "/bassem-msayif.webp", width: 750, height: 750, alt: "Bassem Msayif" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshiVariable.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
