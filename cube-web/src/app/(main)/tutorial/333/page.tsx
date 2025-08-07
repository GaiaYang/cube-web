import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "方塊教學總覽",
  description: "這裡列出作者本人的學習精華，讓想要速解的玩家有明確方向的學習。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="方塊教學總覽"
          description="這裡列出作者本人的學習精華，讓想要速解的玩家有明確方向的學習。"
        />
      </ContentContainer>
    </main>
  );
}
