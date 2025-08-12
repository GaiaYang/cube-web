import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "三階主頁面",
  description: "三階方塊的相關內容。",
  alternates: { canonical: "/event/333" },
};

export default function Page() {
  return <div>三階主頁面</div>;
}
