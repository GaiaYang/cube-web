"use client";

import React from "react";
import { RotateCcwIcon } from "lucide-react";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { withImmer } from "jotai-immer";

import { CubeFaceColors } from "@/enums/cube/color";

import cn from "@/utils/cn";
import getOppositeColor from "@/utils/cube/getOppositeColor";
import { options } from "@/options/cube/color";
import { getBgColor } from "@/themes/cube/colors";
import { cubeFaceColorAtom, store, initialValue } from "@/jotai/settings";
import useMounted from "@/hooks/useMounted";

const notNilOptions = options.filter(({ value }) => value !== "none");
const hydrateAtoms = new Map([[cubeFaceColorAtom, initialValue.cubeFaceColor]]);
const immerCubeFaceColorAtom = withImmer(cubeFaceColorAtom);

export default function SwitchCubeFaceColor() {
  const mounted = useMounted();
  useHydrateAtoms(hydrateAtoms, {
    store,
  });
  const [cubeFaceColor, setCubeFaceColor] = useAtom(immerCubeFaceColorAtom);
  const bottomColor = getOppositeColor(cubeFaceColor.top);
  const topOptions = notNilOptions;
  const frontOptions = notNilOptions.filter(
    (item) => !(item.value === cubeFaceColor.top || item.value === bottomColor),
  );
  const isDisabled = !mounted;

  return (
    <div className="card">
      <div className="card-body p-0">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">方塊頂面顏色調整</legend>
          <div className="flex flex-wrap gap-6">
            {topOptions.map(({ id, value, label }) => {
              return (
                <label
                  key={id}
                  className="flex items-center gap-3 hover:cursor-pointer"
                >
                  <input
                    type="radio"
                    name="cubeTopColor"
                    disabled={isDisabled}
                    checked={cubeFaceColor.top === value}
                    onChange={() => {
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
                    className="radio"
                  />
                  <ColorPreviewBox color={value} />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">方塊前面顏色調整</legend>
          <div className="flex flex-wrap gap-6">
            {frontOptions.map(({ id, value, label }) => {
              return (
                <label
                  key={id}
                  className="flex items-center gap-3 hover:cursor-pointer"
                >
                  <input
                    type="radio"
                    name="cubeFrontColor"
                    checked={cubeFaceColor.front === value}
                    disabled={isDisabled}
                    onChange={() => {
                      setCubeFaceColor((draft) => {
                        draft.front = value;
                      });
                    }}
                    className="radio"
                  />
                  <ColorPreviewBox color={value} />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="card-actions">
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
    </div>
  );
}

function ColorPreviewBox({ color }: { color: CubeFaceColors }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "border-neutral/25 size-6 rounded border",
        getBgColor(color),
      )}
    />
  );
}
