"use client";

import React from "react";
import { useHydrateAtoms } from "jotai/utils";
import { useImmerAtom } from "jotai-immer";

import { CubeFaceColors } from "@/enums/cube/color";

import cn from "@/utils/cn";
import getOppositeColor from "@/utils/cube/getOppositeColor";
import { options } from "@/options/cube/color";
import { getBgColor } from "@/themes/cube/colors";
import { cubeFaceColorAtom, store, initialValue } from "@/jotai/settings";
import useMounted from "@/hooks/useMounted";

const notNilOptions = options.filter(({ value }) => value !== "none");
const hydrateAtoms = new Map([[cubeFaceColorAtom, initialValue.cubeFaceColor]]);

export default function SwitchCubeFaceColor() {
  const mounted = useMounted();
  useHydrateAtoms(hydrateAtoms, {
    store,
  });
  const [cubeFaceColor, setCubeFaceColor] = useImmerAtom(cubeFaceColorAtom);
  const bottomColor = getOppositeColor(cubeFaceColor.top);
  const topOptions = notNilOptions;
  const frontOptions = notNilOptions.filter(
    (item) => !(item.value === cubeFaceColor.top || item.value === bottomColor),
  );
  const isDisabled = !mounted;

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">方塊頂面顏色調整</legend>
        <div className="flex flex-wrap gap-6">
          {topOptions.map(({ id, value, label }) => {
            const isChecked = cubeFaceColor.top === value;
            return (
              <label
                key={id}
                className="flex items-center gap-3 hover:cursor-pointer"
              >
                <input
                  type="radio"
                  name="cubeTopColor"
                  disabled={isDisabled}
                  checked={isChecked}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    if (checked) {
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
                    }
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
            const isChecked = cubeFaceColor.front === value;
            return (
              <label
                key={id}
                className="flex items-center gap-3 hover:cursor-pointer"
              >
                <input
                  type="radio"
                  name="cubeFrontColor"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    if (checked) {
                      setCubeFaceColor((draft) => {
                        draft.front = value;
                      });
                    }
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
