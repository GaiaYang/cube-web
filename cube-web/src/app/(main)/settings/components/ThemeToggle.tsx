"use client";

import React from "react";
import { RotateCcwIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { options, type OptionType } from "@/options/theme";
import useMounted from "@/hooks/useMounted";

import ThemeIcon from "@/components/ThemeIcon";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const isDisabled = !mounted;

  function _renderButton({ id, value, label }: OptionType) {
    return (
      <label key={id} className="flex items-center gap-3 hover:cursor-pointer">
        <input
          type="radio"
          name="theme"
          disabled={isDisabled}
          checked={theme === value}
          onChange={() => {
            setTheme(value);
          }}
          className="radio"
        />
        <ThemeIcon theme={value} className="size-6" />
        {label}
      </label>
    );
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">網站主題色</legend>
          <div className="flex flex-wrap gap-6">
            {options.map(_renderButton)}
          </div>
        </fieldset>
        <div className="card-actions">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setTheme("system")}
            className="btn btn-soft btn-error"
          >
            <RotateCcwIcon />
            重設主題
          </button>
        </div>
      </div>
    </div>
  );
}
