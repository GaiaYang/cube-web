"use client";
import { RotateCcwIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

import Card from "@/components/ui/Card";
import { options } from "@/data/options/cube/color";
import type { Option } from "@/data/options/types";
import { CubeFaceColors } from "@/enums/cube/color";
import useMounted from "@/hooks/useMounted";
import getCubeColor from "@/themes/cube/colors";
import cn from "@/utils/cn";
import getOppositeColor from "@/utils/cube/getOppositeColor";
import { useSettingsStore } from "@/zustand/providers/settings";

const notNilOptions = options.filter(({ value }) => value !== "none");

export default function SwitchCubeFaceColor() {
  const mounted = useMounted();
  const {
    cubeFaceColorTop,
    cubeFaceColorFront,
    setCubeFaceTop,
    setCubeFaceFront,
    resetCubeFaceColor,
  } = useSettingsStore(
    useShallow((state) => {
      return {
        cubeFaceColorTop: state.cubeFaceColor.top,
        cubeFaceColorFront: state.cubeFaceColor.front,
        setCubeFaceTop: state.setCubeFaceTop,
        setCubeFaceFront: state.setCubeFaceFront,
        resetCubeFaceColor: state.resetCubeFaceColor,
      };
    }),
  );
  const bottomColor = getOppositeColor(cubeFaceColorTop);
  const topOptions = notNilOptions;
  const frontOptions = notNilOptions.filter(
    (item) => !(item.value === cubeFaceColorTop || item.value === bottomColor),
  );
  const isDisabled = !mounted;

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title">方塊設定</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">方塊頂面顏色調整</legend>
          <ColorRadios
            radios={topOptions}
            name="cubeTopColor"
            isDisabled={isDisabled}
            getChecked={({ value }) => value === cubeFaceColorTop}
            onCheck={({ value }) => {
              setCubeFaceTop(value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">方塊前面顏色調整</legend>
          <ColorRadios
            radios={frontOptions}
            name="cubeFrontColor"
            isDisabled={isDisabled}
            getChecked={({ value }) => value === cubeFaceColorFront}
            onCheck={({ value }) => {
              setCubeFaceFront(value);
            }}
          />
        </fieldset>
        <div className="card-actions mt-6">
          <button
            type="button"
            disabled={isDisabled}
            className="btn btn-soft btn-error"
            onClick={resetCubeFaceColor}
          >
            <RotateCcwIcon />
            重設顏色
          </button>
        </div>
      </div>
    </Card>
  );
}

function ColorRadios({
  radios,
  name,
  getChecked,
  onCheck,
  isDisabled,
}: {
  radios: typeof options;
  name: string;
  getChecked?: (params: Option<CubeFaceColors>) => boolean;
  onCheck?: (params: Option<CubeFaceColors>) => void;
  isDisabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {radios.map((item) => {
        const checked = getChecked?.(item);

        return (
          <label
            key={item.id}
            className="relative flex items-center justify-center"
          >
            <span className="sr-only">{item.label}</span>
            <input
              type="radio"
              name={name}
              checked={checked}
              disabled={isDisabled}
              onChange={() => {
                onCheck?.(item);
              }}
              className="sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "size-8 cursor-pointer rounded-full",
                { "outline-primary outline-2 outline-offset-2": checked },
                {
                  "border border-neutral-500/50":
                    item.value === CubeFaceColors.WHITE,
                },
                getCubeColor(item.value, "bg"),
              )}
            />
          </label>
        );
      })}
    </div>
  );
}
