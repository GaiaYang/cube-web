"use client";

import { useState } from "react";

import { useMenuState } from "./MenuState";

export interface MenuDetailsProps
  extends Omit<React.ComponentProps<"details">, "id"> {
  id: string;
}

export default function MenuDetails({ id, ...props }: MenuDetailsProps) {
  const { activeCollapseIds, pathname } = useMenuState();
  const [manualState, setManualState] = useState<{
    open: boolean;
    pathname: string;
  } | null>(null);
  const open =
    manualState?.pathname === pathname
      ? manualState.open
      : activeCollapseIds.has(id);

  const onToggle: React.ToggleEventHandler<HTMLDetailsElement> = (event) => {
    setManualState({ open: event.currentTarget.open, pathname });
  };

  return <details {...props} open={open} onToggle={onToggle} />;
}
