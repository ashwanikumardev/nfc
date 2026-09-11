import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NFC Review Cards | One Tap. Your Customer Leaves a Review.",
  description:
    "NFC review cards for local businesses. Customers tap the card and your review page opens in the browser. Minimum 10 cards with Pan-India shipping.",
  keywords: [
    "NFC review cards",
    "Google review card",
    "tap to review card",
    "business review card",
    "restaurant review cards",
    "NFC cards for business",
    "Google review NFC card",
    "review link card",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "NFC Review Cards | One Tap Review Access",
    description:
      "Reusable NFC cards that open your business review page with one tap. Minimum 10 cards and Pan-India shipping.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFC Review Cards | One Tap. Your Customer Leaves a Review.",
    description:
      "NFC cards for local businesses — one tap opens your Google review page. No app needed.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: SITE_NAME,
              description:
                "NFC review cards that help customers open a business review page with one tap.",
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
