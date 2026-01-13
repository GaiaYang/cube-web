import { useAtom } from "jotai";

import cn from "@/utils/cn";
import { formModeAtom } from "./jotai";
import { modeTabs } from "./config";

export default function FormModeToggle() {
  const [formMode, setFormMode] = useAtom(formModeAtom);

  return (
    <div role="tablist" className="tabs tabs-border">
      {modeTabs.map(({ id, label }) => (
        <button
          type="button"
          role="tab"
          key={id}
          onClick={() => {
            setFormMode(id);
          }}
          className={cn("tab", { "tab-active": id === formMode })}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
