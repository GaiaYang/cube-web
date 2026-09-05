"use client";
import { useTheme } from "@wrksz/themes/client";
import { cn } from "cn";
import { RotateCcwIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/daisy-ui/button";
import {
  Card,
  CardActions,
  CardBody,
  CardTitle,
} from "@/components/daisy-ui/card";
import { Fieldset, FieldsetLegend } from "@/components/daisy-ui/fieldset";
import { Join } from "@/components/daisy-ui/join";
import ThemeIcon from "@/components/ThemeIcon";
import { options, type OptionType } from "@/data/options/theme";
import useMounted from "@/hooks/useMounted";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const isDisabled = !mounted;

  function _renderButton({ id, value, label }: OptionType) {
    return (
      <label
        key={id}
        className={buttonVariants({
          joinItem: true,
          className: cn("has-checked:btn-primary", {
            "btn-disabled": isDisabled,
          }),
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
      <CardBody>
        <CardTitle>基本設定</CardTitle>
        <Fieldset>
          <FieldsetLegend>網站主題色</FieldsetLegend>
          <Join className="join-vertical sm:join-horizontal">
            {options.map(_renderButton)}
          </Join>
        </Fieldset>
        <CardActions className="mt-6">
          <Button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              setTheme("system");
            }}
            variant="soft"
            color="error"
          >
            <RotateCcwIcon />
            重設主題
          </Button>
        </CardActions>
      </CardBody>
    </Card>
  );
}
