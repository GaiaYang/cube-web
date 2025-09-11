"use client";

import React from "react";
import { RotateCcwIcon } from "lucide-react";
import { useTheme } from "next-themes";

import cn from "@/utils/cn";
import { options, type OptionType } from "@/options/theme";
import useMounted from "@/hooks/useMounted";

import ThemeIcon from "@/components/ThemeIcon";
import Card from "@/components/ui/Card";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const isDisabled = !mounted;

  function _renderButton({ id, value, label }: OptionType) {
    return (
      <label
        key={id}
        className={cn("btn has-checked:btn-primary", {
          "btn-disabled": isDisabled,
        })}
      >
        <input
          type="radio"
          name="theme"
          disabled={isDisabled}
          checked={theme === value}
          onChange={() => {
            setTheme(value);
          }}
          className="sr-only"
        />
        <ThemeIcon theme={value} className="size-6" />
        {label}
      </label>
    );
  }

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title">基本設定</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">網站主題色</legend>
          <div className="flex flex-wrap gap-2">
            {options.map(_renderButton)}
          </div>
        </fieldset>
        <div className="card-actions mt-6">
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
    </Card>
  );
}
