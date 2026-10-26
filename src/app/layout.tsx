import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { clientEnv } from "@/lib/env/client";

import "./globals.css";
import { SHARE_DEFAULTS } from "@/lib/seo/share";
import { SkipLink } from "@/components/layout/skip-link";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "CNS Beauty Skincare",
    template: "%s | CNS Beauty",
  },
  description:
    "CNS Beauty — Your Skin. Your Ritual. Your Confidence. Perawatan kulit untuk ritual kecil mencintai diri sendiri setiap hari.",
  applicationName: "CNS Beauty",
  openGraph: { ...SHARE_DEFAULTS, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#191410" },
    { color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${cormorant.variable} ${inter.variable}`}>
      {/* Legion dark-mode default: class-based, driven by system preference. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches)',
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
