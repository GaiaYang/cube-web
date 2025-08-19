"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Provider, useAtomValue } from "jotai";

import { conversionFormLayoutAtom, conversionTabIndexAtom } from "./jotai";

import type { CommonFormProps } from "./types";
import CodeSpan from "../CodeSpan";
import FormModeToggle from "./FormModeToggle";
import Tabs from "./Tabs";
const StandForm = dynamic(() => import("./StandForm"));
const InPlaceForm = dynamic(() => import("./InPlaceForm"));

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
                <CodeSpan codes={["M", "S", "E"]} />
              </li>
              <li>
                <span>非標準多層</span>
                <CodeSpan codes={["r", "l", "u", "d", "f", "b"]} />
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

function FormEntry(props: CommonFormProps) {
  const formType = useAtomValue(conversionFormLayoutAtom);

  switch (formType) {
    case "stand":
      return <StandForm {...props} />;
    case "in-place":
      return <InPlaceForm {...props} />;
    default:
      return null;
  }
}
