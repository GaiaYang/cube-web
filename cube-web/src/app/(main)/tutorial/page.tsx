import { type Metadata } from "next";

import Article from "@/components/Article";
import DrawerMenuOverview from "@/components/DrawerMenuOverview";

export const metadata: Metadata = {
  title: "教學總覽",
  description: "整理本站所有教學內容，涵蓋三階方塊為主的完整學習資源。",
  alternates: { canonical: "/tutorial" },
};

export default function Page() {
  return (
    <Article>
      <h1>教學總覽</h1>
      <p>
        在這裡你可以快速瀏覽本站的所有教學內容，主要以三階魔術方塊為核心，並逐步擴展至更進階的解法與延伸技巧。
      </p>
      <DrawerMenuOverview />
    </Article>
  );
}
