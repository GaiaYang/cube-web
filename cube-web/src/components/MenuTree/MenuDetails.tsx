"use client";

import { useCallback, useMemo, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomEffect } from "jotai-effect";

import { openIdsAtom, pathnameAtom } from "./jotai";

export type MenuDetailsProps = React.DetailsHTMLAttributes<HTMLDetailsElement>;

export default function MenuDetails({ id, ...props }: MenuDetailsProps) {
  const [open, setOpen] = useState<null | boolean>(null);
  const isActive = useAtomValue(
    useMemo(
      () => atom((get) => (id ? get(openIdsAtom).includes(id) : false)),
      [id],
    ),
  );

  // 換頁時重設獨立開關
  useAtom(
    useMemo(
      () =>
        atomEffect((get) => {
          get(pathnameAtom);
          setOpen(null);
        }),
      [],
    ),
  );

  // 手動操作時獨立開關
  const onToggle = useCallback<React.ToggleEventHandler<HTMLDetailsElement>>(
    (event) => {
      setOpen(event.currentTarget.open);
    },
    [],
  );

  return <details {...props} open={open ?? isActive} onToggle={onToggle} />;
}
