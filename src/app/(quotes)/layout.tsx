import type { Metadata, Viewport } from "next/types";
import React from "react";
import "@/style/style.scss";
import Script from "next/script";

export const metadata: Metadata = {
  title: "All About Africa",
  icons: "/square@150.png",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn2.takeoffgo.com/assets/fonts/albra/font.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn2.takeoffgo.com/assets/fonts/spezia/font.css"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.2/css/all.css"
          integrity="sha384-XxNLWSzCxOe/CFcHcAiJAZ7LarLmw3f4975gOO6QkxvULbGGNDoSOTzItGUG++Q+"
          crossOrigin="anonymous"
        />

        <Script
          defer
          data-domain="allaboutafrica.au"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
