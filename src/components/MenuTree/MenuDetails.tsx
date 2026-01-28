"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { atom, useAtomValue } from "jotai";
import { usePathname } from "next/navigation";

import { openIdsAtom } from "./jotai";

export type MenuDetailsProps = React.DetailsHTMLAttributes<HTMLDetailsElement>;

export default function MenuDetails({ id, ...props }: MenuDetailsProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<null | boolean>(null);
  const isActive = useAtomValue(
    useMemo(
      () => atom((get) => (id ? get(openIdsAtom).includes(id) : false)),
      [id],
    ),
  );
  const resetOpen = useEffectEvent(() => {
    setOpen(null);
  });

  // 換頁時重設獨立開關
  useEffect(() => {
    resetOpen();
  }, [pathname]);

  // 手動操作時獨立開關
  const onToggle: React.ToggleEventHandler<HTMLDetailsElement> = (event) => {
    setOpen(event.currentTarget.open);
  };

  return <details {...props} open={open ?? isActive} onToggle={onToggle} />;
}
