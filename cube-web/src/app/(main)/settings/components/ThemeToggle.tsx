"use client";

import React from "react";
import { useTheme } from "next-themes";

import { options, type OptionType } from "@/options/theme";
import useMounted from "@/hooks/useMounted";

import ThemeIcon from "@/components/ThemeIcon";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const isDisabled = !mounted;

  function _renderButton({ id, value, label }: OptionType) {
    const isChecked = theme === value;
    return (
      <label key={id} className="flex items-center gap-3 hover:cursor-pointer">
        <input
          type="radio"
          name="theme"
          disabled={isDisabled}
          checked={isChecked}
          onChange={(event) => {
            const checked = event.target.checked;
            if (checked) {
              setTheme(value);
            }
          }}
          className="radio"
        />
        <ThemeIcon theme={value} className="size-6" />
        {label}
      </label>
    );
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">網站主題色</legend>
      <div className="flex flex-wrap gap-6">{options.map(_renderButton)}</div>
    </fieldset>
  );
}
