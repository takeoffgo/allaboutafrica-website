import type { Metadata } from "next";
import { Playfair } from "next/font/google";

import "./globals.css";

const font = Playfair({
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "All About Africa - Australia",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  );
}
