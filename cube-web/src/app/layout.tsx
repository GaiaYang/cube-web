import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: { default: "Cube web", template: "%s | Cube web" },
  description:
    "一個魔方愛好者的網站，這裡是為三階魔方進階玩家打造的教學平台，分享如何從LBL解法精進到CFOP進階玩家。",
  metadataBase: new URL(SITE_URL),
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
        )}
      >
        {children}
      </body>
    </html>
  );
}
