import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: "虛空魔方 | 魔術方塊教學網站",
    template: "%s | 虛空魔方",
  },
  description:
    "虛空魔方（Voidling Cube）專為速解進階玩家設計，提供系統化的教學資源、觀念解析與公式查詢，協助你突破瓶頸、提升效率與理解力。",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body
        className={clsx(
          noto_sans_tc.className,
          noto_sans_tc.variable,
          noto_serif_tc.variable,
          noto_sans_mono.variable,
          "antialiased",
          "selection:bg-primary selection:text-primary-content",
        )}
      >
        {children}
      </body>
    </html>
  );
}
