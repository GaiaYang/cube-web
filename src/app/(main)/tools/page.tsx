import { type Metadata } from "next";

import Article from "@/components/ui/Article";

export const metadata: Metadata = {
  title: "工具總覽",
  description: "本站提供各項實用工具，例如鏡像公式、反轉公式等實用工具",
};

export default function Page() {
  return (
    <Article>
      <h1>工具總覽</h1>
      <p>本站提供各項實用工具，例如鏡像公式、反轉公式等實用工具</p>
    </Article>
  );
}
