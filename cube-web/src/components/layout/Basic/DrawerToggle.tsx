"use client";

import React, { useEffect, useEffectEvent, useRef } from "react";

import { drawerToggleId, drawerMenuId } from "./config";

export default function DrawerToggle() {
  const ref = useRef<HTMLInputElement>(null);
  const handleClick = useEffectEvent((ev: PointerEvent) => {
    const target = ev.target as HTMLElement;
    if (target.closest("a[href]") && ref.current) {
      ref.current.checked = false;
    }
  });

  // 點擊菜單連結時關閉
  useEffect(() => {
    const menuEl = document.getElementById(drawerMenuId);
    if (!menuEl) return;

    menuEl.addEventListener("click", handleClick);

    return () => {
      menuEl.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <input
      ref={ref}
      id={drawerToggleId}
      type="checkbox"
      className="drawer-toggle"
    />
  );
}
