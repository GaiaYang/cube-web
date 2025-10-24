import { type Metadata } from "next";

import Article from "@/components/Article";
import NewTabLink from "@/components/NewTabLink";
import CodeSpan from "./components/CodeSpan";
import Converter from "./components/Converter";

export const metadata: Metadata = {
  title: "公式轉換器",
  description: "提供實用的魔術方塊公式轉換。",
  alternates: { canonical: "/tools/converter" },
};

export default function Page() {
  return (
    <Article>
      <h1>公式轉換器</h1>
      <p>提供實用的魔術方塊公式轉換。</p>
      <h2>使用說明</h2>
      <h3>支援以下符號</h3>
      <ul className="[&>li>span]:flex [&>li>span]:gap-2">
        <li>
          <span>基本符號</span>
          <CodeSpan codes={["R", "L", "U", "D", "F", "B"]} />
        </li>
        <li>
          <span>轉體</span>
          <CodeSpan codes={["x", "y", "z"]} />
        </li>
        <li>
          <span>標準多層</span>
          <CodeSpan codes={["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"]} />
        </li>
      </ul>
      <h3>可使用的詞綴</h3>
      <ul>
        <li>數字</li>
        <li>
          <code>{"'"}</code>
        </li>
      </ul>
      <p>
        如果還不看不懂代號的話，請先前往{" "}
        <NewTabLink href="/tutorial/notation">代號說明</NewTabLink>
      </p>
      <h2>轉換工具</h2>
      <Converter />
    </Article>
  );
}
