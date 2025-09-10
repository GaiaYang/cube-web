"use client";

import React from "react";
import { useTheme } from "next-themes";

import { options, type OptionType } from "@/options/theme";
import useMounted from "@/hooks/useMounted";
import cn from "@/utils/cn";

import ThemeIcon from "@/components/ThemeIcon";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  function _renderButton({ id, value, label }: OptionType) {
    return (
      <button
        key={id}
        value={value}
        type="button"
        name="theme"
        disabled={!mounted}
        onClick={() => {
          setTheme(value);
        }}
        className={cn(
          "btn join-item",
          mounted && {
            "btn-primary": theme === value,
          },
        )}
      >
        <ThemeIcon theme={value} className="size-6" />
        {label}
      </button>
    );
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">網站主題色</legend>
      <div className="join">{options.map(_renderButton)}</div>
    </fieldset>
  );
}
