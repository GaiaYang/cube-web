import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "教學總覽",
  description: "本站教學項目一覽，主要以三階方塊為主",
  alternates: { canonical: "/tutorial" },
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="教學總覽"
          description="本站教學項目一覽，主要以三階方塊為主"
        />
      </ContentContainer>
    </main>
  );
}
