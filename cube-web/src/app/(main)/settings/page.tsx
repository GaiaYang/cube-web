import { type Metadata } from "next";
import React from "react";

import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "網站設定",
  description: "本網站的一些設定項目。",
  alternates: { canonical: "/settings" },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="prose">
        <h1>網站設定</h1>
        <p>本網站的一些設定項目。</p>
      </div>
      <ThemeToggle />
    </div>
  );
}
