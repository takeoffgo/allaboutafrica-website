import type { Metadata, Viewport } from "next/types";
import React from "react";
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

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        />
        {/* Copernicus New Cond — add stylesheet link here once licensed */}
        <link
          rel="stylesheet"
          href="https://cdn.allaboutafrica.au/fonts/copernicus/font.css"
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

export default Layout;
