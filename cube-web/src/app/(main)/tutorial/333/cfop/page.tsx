import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "CFOP",
  description:
    "CFOP 是最多人使用速解方法，其變體解法跟資源十分充足，適合入門速解的方法。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="CFOP"
          description="CFOP 是最多人使用速解方法，其變體解法跟資源十分充足，適合入門速解的方法。"
          eyebrow="弗雷德里奇法(Fridrich Method)"
        />
      </ContentContainer>
    </main>
  );
}
