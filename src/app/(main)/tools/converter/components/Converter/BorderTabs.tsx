import type { TabItem } from "./types";

import cn from "@/utils/cn";

interface BorderTabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
}

export default function BorderTabs<T extends string>({
  items,
  value,
  onChange,
}: BorderTabsProps<T>) {
  return (
    <div role="tablist" className="tabs tabs-border">
      {items.map(({ id, label }) => (
        <button
          type="button"
          role="tab"
          key={id}
          aria-selected={id === value}
          onClick={() => {
            onChange(id);
          }}
          className={cn("tab", { "tab-active": id === value })}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
