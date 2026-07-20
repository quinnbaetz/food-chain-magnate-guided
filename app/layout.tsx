import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://food-chain-magnate-guided.quinnbaetz.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Food Chain Magnate · Guided Tabletop",
  description: "A guided web adaptation of Food Chain Magnate for learning against three bot players.",
  icons: { icon: `${siteUrl}/favicon.svg`, shortcut: `${siteUrl}/favicon.svg` },
  openGraph: { title: "Food Chain Magnate · Guided Tabletop", description: "Build a restaurant empire against three bot executives.", images: [{ url: `${siteUrl}/og.png`, width: 1734, height: 907 }] },
  twitter: { card: "summary_large_image", title: "Food Chain Magnate · Guided Tabletop", description: "Build a restaurant empire against three bot executives.", images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
