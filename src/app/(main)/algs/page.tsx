import { type Metadata } from "next";

import Article from "@/components/ui/Article";
import DrawerMenuOverview from "@/components/DrawerMenuOverview";

export const metadata: Metadata = {
  title: "公式總覽",
  description: "依照項目分類本站收入的所有公式總覽。",
};

export default function Page() {
  return (
    <Article>
      <h1>公式總覽</h1>
      <p>依照項目分類本站收入的所有公式總覽。</p>
      <DrawerMenuOverview />
    </Article>
  );
}
