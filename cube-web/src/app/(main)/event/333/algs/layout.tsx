import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
