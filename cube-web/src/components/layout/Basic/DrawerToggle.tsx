"use client";

import React, { useEffect, useRef } from "react";

import { drawerId, drawerMenuId } from "./config";

export default function DrawerToggle() {
  const ref = useRef<HTMLInputElement>(null);

  // 點擊菜單連結時關閉
  useEffect(() => {
    const menuEl = document.getElementById(drawerMenuId);
    if (!menuEl) return;

    function handleClick(ev: PointerEvent) {
      const target = ev.target as HTMLElement;
      if (target.closest("a[href]") && ref.current) {
        ref.current.checked = false;
      }
    }

    menuEl.addEventListener("click", handleClick);

    return () => {
      menuEl.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <input ref={ref} id={drawerId} type="checkbox" className="drawer-toggle" />
  );
}
