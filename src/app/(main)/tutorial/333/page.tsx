import { type Metadata } from "next";

import Article from "@/components/ui/Article";

export const metadata: Metadata = {
  title: "魔術方塊教學總覽",
  description: "這裡列出作者本人的學習精華，讓想要速解的玩家有明確方向學習。",
};

export default function Page() {
  return (
    <Article>
      <h1>魔術方塊教學總覽</h1>
      <p>這裡列出作者本人的學習精華，讓想要速解的玩家有明確方向學習。</p>
    </Article>
  );
}
