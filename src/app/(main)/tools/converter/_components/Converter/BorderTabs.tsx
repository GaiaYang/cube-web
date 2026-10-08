import { Tab, Tabs } from "@/components/daisy-ui/tabs";

import type { TabItem } from "./types";

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
    <Tabs variant="border">
      {items.map(({ id, label }) => (
        <Tab
          key={id}
          aria-selected={id === value}
          active={id === value}
          onClick={() => {
            onChange(id);
          }}
        >
          {label}
        </Tab>
      ))}
    </Tabs>
  );
}
