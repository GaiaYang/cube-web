import React from "react";

import HeaderSection from "@/components/HeaderSection";

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">3階公式總覽</h1>
      <HeaderSection
        title="3階公式總覽"
        description="這裡是 3x3 魔術方塊的所有公式總覽，包含各種情況的解法。"
      />
    </main>
  );
}
