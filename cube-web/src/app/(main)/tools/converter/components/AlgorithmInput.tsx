import { Control, Controller } from "react-hook-form";

import type { CommonFormProps } from "./types";
import { type Schema } from "./form";
import cn from "@/utils/cn";

export default function AlgorithmInput({
  cubeLayer,
}: Pick<CommonFormProps, "cubeLayer">) {
  return (
    <Controller
      control={undefined as unknown as Control<Schema>}
      name="algorithm"
      render={({ field, fieldState: { error } }) => {
        const isError = Boolean(error);

        return (
          <fieldset className="fieldset">
            <input
              {...field}
              type="text"
              className={cn("input focus:input-primary", {
                "input-error": isError,
              })}
              placeholder="R U R' U'"
            />
            <p className={cn("label", { "text-error": isError })}>
              {error?.message ??
                (cubeLayer === "nnn" ? "允許官方符號" : "允許官方跟非官方符號")}
            </p>
          </fieldset>
        );
      }}
    />
  );
}
