import type { Metadata } from "next";
import { Playfair } from "next/font/google";

import "./globals.css";
import PlausibleProvider from "next-plausible";

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
    <PlausibleProvider domain="allaboutafrica.au">
      <html lang="en" className={font.className}>
        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}
