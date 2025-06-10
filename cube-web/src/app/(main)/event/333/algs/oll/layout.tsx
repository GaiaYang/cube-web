import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description:
    "OLL（最後一層定向）是 CFOP 方法的第三步，目的是讓 3x3 魔術方塊頂層顏色一致，總共有 57 種情況，需透過公式解法完成。",
  keywords: ["OLL", "魔術方塊", "CFOP", "公式"],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
