import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description: "頂層的方塊位置排列，共有 21 種情況。",
  keywords: ["PLL", "魔術方塊", "CFOP", "公式"],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
