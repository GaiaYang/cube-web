"use client";

import { useAtom } from "jotai";
import React from "react";

import { inPlaceAtom } from "./jotai";

export default function FormModeToggle() {
  const [inPlace, setInPlace] = useAtom(inPlaceAtom);

  return (
    <label className="label">
      <input
        type="checkbox"
        className="toggle checked:toggle-primary"
        checked={inPlace}
        onChange={(e) => setInPlace(e.target.checked)}
      />
      是否為原地複寫模式
    </label>
  );
}
