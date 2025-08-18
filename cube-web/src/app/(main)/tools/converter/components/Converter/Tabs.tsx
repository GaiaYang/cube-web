import React from "react";
import { useAtom } from "jotai";

import cn from "@/utils/cn";

import { TabItem } from "./types";
import { tabIndexAtom } from "./jotai";
import { tabs } from "./config";

export default function Tabs() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);

  function _renderTab({ id, label }: TabItem, index: number) {
    return (
      <button
        type="button"
        role="tab"
        key={id}
        onClick={() => setTabIndex(index)}
        className={cn("tab", { "tab-active": tabIndex === index })}
      >
        {label}
      </button>
    );
  }

  return (
    <div role="tablist" className="tabs tabs-box">
      {tabs.map(_renderTab)}
    </div>
  );
}
