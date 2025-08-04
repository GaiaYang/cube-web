import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description: "頂層的方塊位置排列，共有21種情況。",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
