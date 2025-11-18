"use client";

import { Activity, useMemo } from "react";
import { Provider, useAtomValue } from "jotai";
import dynamic from "next/dynamic";

import type { CommonFormProps } from "./types";
import { conversionFormLayoutAtom, conversionTabIndexAtom } from "./jotai";

import FormModeToggle from "./FormModeToggle";
import Tabs from "./Tabs";
import CodeSpan from "../CodeSpan";
import { ConverterPropsContext } from "./context";

const StandForm = dynamic(() => import("./StandForm"));
const InPlaceForm = dynamic(() => import("./InPlaceForm"));

export default function Converter() {
  return (
    <Provider>
      <section>
        <div className="not-prose grid gap-4">
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

  return (
    <>
      <Activity mode={tabIndex === 0 ? "visible" : "hidden"}>
        <FormEntry cubeOrder="nnn" />
      </Activity>
      <Activity mode={tabIndex === 1 ? "visible" : "hidden"}>
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
          <FormEntry cubeOrder="333" />
        </div>
      </Activity>
    </>
  );
}

function FormEntry({ cubeOrder }: CommonFormProps) {
  const formType = useAtomValue(conversionFormLayoutAtom);
  const value = useMemo(() => ({ cubeOrder }), [cubeOrder]);

  return (
    <ConverterPropsContext.Provider value={value}>
      <Activity mode={formType === "stand" ? "visible" : "hidden"}>
        <StandForm />
      </Activity>
      <Activity mode={formType === "in-place" ? "visible" : "hidden"}>
        <InPlaceForm />
      </Activity>
    </ConverterPropsContext.Provider>
  );
}
