import { useAtom } from "jotai";

import { convertTabs } from "./config";
import { tabIndexAtom } from "./jotai";

import cn from "@/utils/cn";

export default function ConvertTabs() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);

  return (
    <div role="tablist" className="tabs tabs-border">
      {convertTabs.map(({ id, label }, index) => (
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
