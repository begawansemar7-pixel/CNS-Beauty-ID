import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Nunito_Sans } from "next/font/google";

import { clientEnv } from "@/lib/env/client";

/* Legion kit styles (core-styles → legion), then the CNS theme overrides both. */
import "@legion-ui-kit/react-core/styles/core-styles.css";
import "@legion-ui-kit/react-core/styles/legion.css";
import "./globals.css";
import { SHARE_DEFAULTS } from "@/lib/seo/share";
import { ToasterHost } from "@/components/providers/toaster";
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

/** Legion profile: the kit renders in Nunito Sans, kept via the --font-legion variable. */
const nunito = Nunito_Sans({
  variable: "--font-legion",
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
    <html lang="id" className={`${cormorant.variable} ${inter.variable} ${nunito.variable}`}>
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
        <ToasterHost />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
