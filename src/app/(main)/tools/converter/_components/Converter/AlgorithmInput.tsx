import { cn } from "cn";
import { useAtomValue } from "jotai";
import { Controller, useFormContext } from "react-hook-form";

import { Fieldset } from "@/components/daisy-ui/fieldset";
import { Input } from "@/components/daisy-ui/input";
import { Label } from "@/components/daisy-ui/label";
import { type Schema } from "@/forms/algorithmInput";

import { cubeOrderAtom } from "./jotai";

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
              className="focus:input-primary w-full font-mono"
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
