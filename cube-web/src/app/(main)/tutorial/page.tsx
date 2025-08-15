import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "教學總覽",
  description: "本站教學項目一覽，主要以三階方塊為主",
  alternates: { canonical: "/tutorial" },
};

export default function Page() {
  return (
    <Article>
      <h1>教學總覽</h1>
      <p>本站教學項目一覽，主要以三階方塊為主</p>
    </Article>
  );
}
