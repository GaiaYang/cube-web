import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: { default: "Cube web", template: "%s | Cube web" },
  description:
    "針對已能還原三階魔術方塊的玩家，分享作者邁向速解進階的教學與心法，提供系統化解法、觀念解析與實用公式查詢，協助你突破瓶頸、提升效率與理解力。",
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
