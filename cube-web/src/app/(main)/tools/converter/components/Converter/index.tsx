"use client";

import React from "react";
import { Provider, useAtomValue } from "jotai";

import { conversionTabIndexAtom } from "./jotai";

import FormModeToggle from "./FormModeToggle";
import FormEntry from "./FormEntry";
import Tabs from "./Tabs";

export default function Converter() {
  return (
    <Provider>
      <section>
        <div className="grid gap-4">
          <FormModeToggle />
          <Tabs />
        </div>
        <SwitchContent />
      </section>
    </Provider>
  );
}

function SwitchContent() {
  const tabIndex = useAtomValue(conversionTabIndexAtom);

  switch (tabIndex) {
    case 0:
      return <FormEntry cubeOrder="nnn" />;
    case 1:
      return (
        <>
          <div>
            <h3>三階額外符號</h3>
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
          </div>
          <FormEntry cubeOrder="333" />
        </>
      );
    default:
      return null;
  }
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}
