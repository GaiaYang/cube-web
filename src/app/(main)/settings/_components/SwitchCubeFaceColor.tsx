"use client";
import { cn } from "cn";
import { RotateCcwIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/daisy-ui/button";
import {
  Card,
  CardActions,
  CardBody,
  CardTitle,
} from "@/components/daisy-ui/card";
import { Fieldset, FieldsetLegend } from "@/components/daisy-ui/fieldset";
import { options } from "@/data/options/cube/color";
import type { Option } from "@/data/options/types";
import { CubeFaceColors } from "@/enums/cube/color";
import useMounted from "@/hooks/useMounted";
import getCubeColor from "@/themes/cube/colors";
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
      <CardBody>
        <CardTitle>方塊設定</CardTitle>
        <Fieldset>
          <FieldsetLegend>方塊頂面顏色調整</FieldsetLegend>
          <ColorRadios
            radios={topOptions}
            name="cubeTopColor"
            isDisabled={isDisabled}
            getChecked={({ value }) => value === cubeFaceColorTop}
            onCheck={({ value }) => {
              setCubeFaceTop(value);
            }}
          />
        </Fieldset>
        <Fieldset>
          <FieldsetLegend>方塊前面顏色調整</FieldsetLegend>
          <ColorRadios
            radios={frontOptions}
            name="cubeFrontColor"
            isDisabled={isDisabled}
            getChecked={({ value }) => value === cubeFaceColorFront}
            onCheck={({ value }) => {
              setCubeFaceFront(value);
            }}
          />
        </Fieldset>
        <CardActions className="mt-6">
          <Button
            type="button"
            disabled={isDisabled}
            variant="soft"
            color="error"
            onClick={resetCubeFaceColor}
          >
            <RotateCcwIcon />
            重設顏色
          </Button>
        </CardActions>
      </CardBody>
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
