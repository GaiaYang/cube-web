"use client";
import { RotateCcwIcon } from "lucide-react";
import { useAtom } from "jotai";
import { withImmer } from "jotai-immer";

import type { Option } from "@/data/options/types";
import { CubeFaceColors } from "@/enums/cube/color";

import cn from "@/utils/cn";
import getOppositeColor from "@/utils/cube/getOppositeColor";
import { options } from "@/data/options/cube/color";
import getCubeColor from "@/themes/cube/colors";
import { cubeFaceColorAtom, store, initialValue } from "@/jotai/settings";
import useMounted from "@/hooks/useMounted";

import Card from "@/components/ui/Card";

const notNilOptions = options.filter(({ value }) => value !== "none");
const immerCubeFaceColorAtom = withImmer(cubeFaceColorAtom);

export default function SwitchCubeFaceColor() {
  const mounted = useMounted();
  const [cubeFaceColor, setCubeFaceColor] = useAtom(immerCubeFaceColorAtom, {
    store,
  });
  const bottomColor = getOppositeColor(cubeFaceColor.top);
  const topOptions = notNilOptions;
  const frontOptions = notNilOptions.filter(
    (item) => !(item.value === cubeFaceColor.top || item.value === bottomColor),
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
            getChecked={({ value }) => value === cubeFaceColor.top}
            onCheck={({ value }) => {
              setCubeFaceColor((draft) => {
                draft.top = value;
                // 頂面替換預設替換前面顏色
                draft.front = topOptions.filter(
                  (item) =>
                    !(
                      item.value === value ||
                      item.value === getOppositeColor(value)
                    ),
                )[0].value;
              });
            }}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">方塊前面顏色調整</legend>
          <ColorRadios
            radios={frontOptions}
            name="cubeFrontColor"
            isDisabled={isDisabled}
            getChecked={({ value }) => value === cubeFaceColor.front}
            onCheck={({ value }) => {
              setCubeFaceColor((draft) => {
                draft.front = value;
              });
            }}
          />
        </fieldset>
        <div className="card-actions mt-6">
          <button
            type="button"
            disabled={isDisabled}
            className="btn btn-soft btn-error"
            onClick={() => {
              setCubeFaceColor(initialValue.cubeFaceColor);
            }}
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
            <div
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
