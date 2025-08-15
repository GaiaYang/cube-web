import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";
import CubeRuleHover from "./components/CubeRuleHover";

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
          <span>
            基本符號{["R", "L", "U", "D", "F", "B"].map(_renderCodeItem)}
          </span>
        </li>
        <li>
          <span>轉體{["x", "y", "z"].map(_renderCodeItem)}</span>
        </li>
        <li>
          <span>中間層{["M", "S", "E"].map(_renderCodeItem)}</span>
        </li>
        <li>
          <span>
            大寫多層{["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"].map(_renderCodeItem)}
          </span>
        </li>
        <li>
          <span>
            小寫多層{["r", "l", "u", "d", "f", "b"].map(_renderCodeItem)}
          </span>
        </li>
      </ul>
      <h3>可使用的詞綴</h3>
      <ul>
        <li>數字</li>
        <li>
          <code>{"'"}</code>
        </li>
      </ul>
      <h3>代號結構</h3>
      <CubeRuleHover />
      <h2>鏡像公式</h2>
      <p>可將右手公式直接套用到左手，解決鏡像的兩種情況。</p>
      <h2>反轉公式</h2>
      <p>可讓你倒著執行整條公式，將完成的狀態回到初始位置。</p>
      <h2>旋轉公式</h2>
      <p>可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。</p>
    </Article>
  );
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}
