"use client";

import React from "react";
import { useHydrateAtoms } from "jotai/utils";
import { useImmerAtom } from "jotai-immer";

import { CubeFaceColors } from "@/enums/cube/color";

import cn from "@/utils/cn";
import getOppositeColor from "@/utils/cube/getOppositeColor";
import { options, labels } from "@/options/cube/color";
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

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">方塊頂面顏色調整</legend>
        <div className="join">
          {topOptions.map(({ id, value, label }) => (
            <button
              key={id}
              type="button"
              disabled={!mounted}
              onClick={() => {
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
              className={cn("btn join-item", {
                "btn-primary": cubeFaceColor.top === value,
              })}
            >
              <ColorPreviewBox color={value} />
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="my-3 flex items-center gap-2">
        <ColorPreviewBox
          color={
            options.find(({ value }) => value === bottomColor)?.value ??
            CubeFaceColors.NONE
          }
        />
        <p className="text-sm">{`當前底色為${labels[bottomColor ?? "none"]}`}</p>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">方塊前面顏色調整</legend>
        <div className="join">
          {frontOptions.map(({ id, value, label }) => (
            <button
              key={id}
              type="button"
              disabled={!mounted}
              onClick={() => {
                setCubeFaceColor((draft) => {
                  draft.front = value;
                });
              }}
              className={cn("btn join-item", {
                "btn-primary": cubeFaceColor.front === value,
              })}
            >
              <ColorPreviewBox color={value} />
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function ColorPreviewBox({ color }: { color: CubeFaceColors }) {
  return (
    <span
      className={cn(
        "border-neutral/25 size-6 rounded border",
        getBgColor(color),
      )}
    />
  );
}
