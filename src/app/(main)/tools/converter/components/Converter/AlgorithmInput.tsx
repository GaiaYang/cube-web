import { Controller, useFormContext } from "react-hook-form";
import { useAtomValue } from "jotai";

import { type Schema } from "./form";
import { cubeOrderAtom } from "./jotai";

import cn from "@/utils/cn";

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
          <fieldset className="fieldset">
            <input
              {...field}
              type="text"
              autoComplete="off"
              spellCheck="false"
              className={cn("input focus:input-primary", "w-full font-mono", {
                "input-error": isError,
              })}
              placeholder="R U R' U'"
            />
            <p className={cn("label", { "text-error": isError })}>
              {error?.message ??
                (cubeOrder === "nnn" ? "允許官方符號" : "允許官方跟非官方符號")}
            </p>
          </fieldset>
        );
      }}
    />
  );
}
