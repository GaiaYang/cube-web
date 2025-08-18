"use client";

import React from "react";
import { Provider } from "jotai";

import FormModeToggle from "./FormModeToggle";
import FormEntry from "./FormEntry";
import Tabs from "./Tabs";
import TabPanel from "./TabPanel";

export default function Converter() {
  return (
    <section>
      <Provider>
        <FormModeToggle />
        <Tabs />
        <TabPanel tabIndex={0}>{() => <FormEntry />}</TabPanel>
        <TabPanel tabIndex={1}>
          {() => (
            <>
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
              <FormEntry />
            </>
          )}
        </TabPanel>
      </Provider>
    </section>
  );
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}
