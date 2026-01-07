import { type Metadata } from "next";

import Article from "@/components/Article";
import Notices from "@/components/Notices";

export const metadata: Metadata = {
  title: "轉動代號說明",
  description:
    "完整解說魔術方塊公式中的字母與數字代表的轉動方式，讓你輕鬆理解每個步驟。",
};

export default function Page() {
  return (
    <Article>
      <h1>轉動代號說明</h1>
      <p>
        這裡將詳細說明魔術方塊公式中的字母與數字代表的轉動方式，幫助你快速掌握每個公式的操作方法。
      </p>
      <Notices type="under-construction" />
    </Article>
  );
}
