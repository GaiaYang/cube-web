import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description:
    "PLL（最後一層排列）是 CFOP 方法的第四步，也是最後一步，目的是將頂層的方塊位置排列正確，使整顆 3x3 完全還原，共有 21 種情況，需透過公式解法完成。",
  keywords: ["PLL", "魔術方塊", "CFOP", "公式"],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
