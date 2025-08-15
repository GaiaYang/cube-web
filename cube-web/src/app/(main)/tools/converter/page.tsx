import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";
import {
  MirrorForm,
  ReverseForm,
  RotateForm,
  MirrorRotateForm,
} from "./components/ConverterForm";

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
      <p>
        如果還不看不懂代號的話，請先前往
        <ExternalLink href="/tutorial/notation">代號說明</ExternalLink>
      </p>
      <h3>代號結構</h3>
      <ExternalLink href="/tutorial/notation/structure">
        代號結構教學
      </ExternalLink>
      <h2>鏡像公式</h2>
      <p>可將右手公式直接套用到左手，解決鏡像的兩種情況。</p>
      <MirrorForm />
      <h2>反轉公式</h2>
      <p>可讓你倒著執行整條公式，將完成的狀態回到初始位置。</p>
      <ReverseForm />
      <h2>旋轉公式</h2>
      <p>可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。</p>
      <RotateForm />
      <h2>鏡像旋轉公式</h2>
      <p>若公式有鏡像形式，可先左右鏡像再前後旋轉，得到同手的鏡像公式。</p>
      <MirrorRotateForm />
    </Article>
  );
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}
