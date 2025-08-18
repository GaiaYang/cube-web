import { atom, useAtomValue } from "jotai";
import React, { useMemo } from "react";

import { tabIndexAtom } from "./jotai";

export interface TabPanelProps {
  tabIndex?: number;
  children?: React.ReactNode | (() => React.ReactNode);
}

export default function TabPanel({ tabIndex, children }: TabPanelProps) {
  const isActive = useAtomValue(
    useMemo(() => atom((get) => get(tabIndexAtom) === tabIndex), [tabIndex]),
  );

  if (isActive) {
    return typeof children === "function" ? children() : children;
  } else {
    return null;
  }
}
