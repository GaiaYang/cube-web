"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LucideProps, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import type { Option } from "@/options/types";
import useMounted from "@/hooks/useMounted";
import cn from "@/utils/cn";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  function _renderButton({ id, value, label, Icon }: ToggleOption) {
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
        <Icon className="size-6" />
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

type ToggleOption = Option<"system" | "light" | "dark"> & {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const options: ToggleOption[] = [
  { id: "system", label: "系統", value: "system", Icon: SunMoonIcon },
  { id: "light", label: "亮色", value: "light", Icon: SunIcon },
  { id: "dark", label: "暗色", value: "dark", Icon: MoonIcon },
];
