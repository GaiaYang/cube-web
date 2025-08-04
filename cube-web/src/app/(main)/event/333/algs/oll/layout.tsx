import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description: "使頂層的方塊顏色一致，總共有 57 種情況",
  keywords: ["OLL", "魔術方塊", "CFOP", "公式"],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
