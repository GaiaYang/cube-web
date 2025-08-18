import React from "react";

import cn from "@/utils/cn";

import { TabProps } from "./types";
import { useAtom } from "jotai";
import { tabIndexAtom } from "./jotai";

const tabs: TabProps[] = [
  { key: "convert", title: "一般轉換器" },
  { key: "convert-333", title: "三階專屬轉換器" },
];

export default function Tabs() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);

  function _renderTab({ key, title }: TabProps, index: number) {
    return (
      <button
        type="button"
        role="tab"
        key={key}
        onClick={() => setTabIndex(index)}
        className={cn("tab", { "tab-active": tabIndex === index })}
      >
        {title}
      </button>
    );
  }

  return (
    <div role="tablist" className="tabs tabs-lift">
      {tabs.map(_renderTab)}
    </div>
  );
}
