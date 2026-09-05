import { Controller, useFormContext } from "react-hook-form";
import { cn } from "cn";
import { useAtomValue } from "jotai";

import { cubeOrderAtom } from "./jotai";

import { Fieldset } from "@/components/daisy-ui/fieldset";
import { Input } from "@/components/daisy-ui/input";
import { Label } from "@/components/daisy-ui/label";
import { type Schema } from "@/forms/algorithmInput";

export default function AlgorithmInput() {
  const { control } = useFormContext<Schema>();
  const cubeOrder = useAtomValue(cubeOrderAtom);

  return (
    <Controller
      control={control}
      name="algorithm"
      render={({ field, fieldState: { error } }) => {
        const isError = Boolean(error);

        return (
          <Fieldset>
            <Input
              {...field}
              type="text"
              autoComplete="off"
              spellCheck="false"
              color={isError ? "error" : undefined}
              className="w-full font-mono focus:input-primary"
              placeholder="R U R' U'"
            />
            <Label className={cn({ "text-error": isError })}>
              {error?.message ??
                (cubeOrder === "nnn" ? "允許官方符號" : "允許官方跟非官方符號")}
            </Label>
          </Fieldset>
        );
      }}
    />
  );
}
