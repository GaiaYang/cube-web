import { StrictMode } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import "./globals.css";
import clsx from "clsx";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: "Void Cube | 魔術方塊資源網站",
    template: "%s | Void Cube",
  },
  description:
    "提供教學、工具及作者的觀念，不用艱深的技巧跟高價的魔術方塊，即使手速跟反應都不夠快也能在15秒內復原完成。",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="zh-Hant-TW" suppressHydrationWarning>
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
          <JotaiProvider>
            <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
          </JotaiProvider>
        </body>
      </html>
    </StrictMode>
  );
}
