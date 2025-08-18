import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";
import Form from "./components/Form";
import { Provider } from "jotai";
import FormModeToggle from "./components/FormModeToggle";
// import {
//   MirrorForm,
//   ReverseForm,
//   RotateForm,
//   MirrorRotateForm,
//   UpperForm,
//   LowerForm,
// } from "./components/ConverterForm";

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
          <span>{["R", "L", "U", "D", "F", "B"].map(_renderCodeItem)}</span>
        </li>
        <li>
          <span>轉體</span>
          <span>{["x", "y", "z"].map(_renderCodeItem)}</span>
        </li>
        <li>
          <span>標準多層</span>
          <span>
            {["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"].map(_renderCodeItem)}
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
        <ExternalLink href="/tutorial/notation">代號說明</ExternalLink>、
        <ExternalLink href="/tutorial/notation/structure">
          代號結構教學
        </ExternalLink>
      </p>
      <section>
        <h2>公式轉換器</h2>
        <Provider>
          <FormModeToggle />
          <div className="tabs tabs-lift mt-5">
            <label className="tab">
              <input type="radio" name="tab-converter" defaultChecked />
              官方格式公式轉換器
            </label>
            <div className="tab-content">
              <Form />
            </div>
            <label className="tab">
              <input type="radio" name="tab-converter" />
              三階公式轉換器
            </label>
            <div className="tab-content">
              <h3>三階專用轉動符號</h3>
              <ul className="[&>li>span]:flex [&>li>span]:gap-2">
                <li>
                  <span>中間層</span>
                  <span>{["M", "S", "E"].map(_renderCodeItem)}</span>
                </li>
                <li>
                  <span>非標準多層</span>
                  <span>
                    {["r", "l", "u", "d", "f", "b"].map(_renderCodeItem)}
                  </span>
                </li>
              </ul>
              <p>該區塊的轉換器額外支援三階非官方符號及特殊功能轉換</p>
              <Form enabledForms={{ upperForm: true, lowerForm: true }} />
            </div>
          </div>
        </Provider>
      </section>
    </Article>
  );
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}
