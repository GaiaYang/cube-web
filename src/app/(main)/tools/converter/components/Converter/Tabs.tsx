import { useAtom } from "jotai";

import cn from "@/utils/cn";
import { conversionTabIndexAtom } from "./jotai";
import { tabs } from "./config";

export default function Tabs() {
  const [tabIndex, setTabIndex] = useAtom(conversionTabIndexAtom);

  return (
    <div role="tablist" className="tabs tabs-box">
      {tabs.map(({ id, label }, index) => (
        <button
          type="button"
          role="tab"
          key={id}
          onClick={() => {
            setTabIndex(index);
          }}
          className={cn("tab", { "tab-active": tabIndex === index })}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
