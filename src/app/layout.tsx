import "./globals.css";

import { StrictMode } from "react";
import clsx from "clsx";
import type { Metadata } from "next";

import Providers from "./components/Providers";

import { SITE_URL } from "@/lib/config";
import { noto_sans_mono, noto_sans_tc, noto_serif_tc } from "@/lib/fonts";

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
      <html
        lang="zh-Hant-TW"
        suppressHydrationWarning
        className={clsx(
          noto_sans_tc.className,
          noto_sans_tc.variable,
          noto_serif_tc.variable,
          noto_sans_mono.variable,
          "h-full antialiased",
          "selection:bg-primary selection:text-primary-content",
        )}
      >
        <body className="flex min-h-full flex-col">
          <Providers>{children}</Providers>
        </body>
      </html>
    </StrictMode>
  );
}
