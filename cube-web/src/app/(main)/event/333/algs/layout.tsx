import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "3階公式總覽",
  description: "這裡是 3x3 魔術方塊的所有公式總覽，包含各種情況的解法。",
  keywords: ["魔術方塊", "CFOP", "公式"],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
