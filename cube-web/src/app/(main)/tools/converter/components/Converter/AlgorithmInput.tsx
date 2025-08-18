import { Control, Controller } from "react-hook-form";

import type { CommonFormProps } from "./types";
import { type Schema } from "./form";
import cn from "@/utils/cn";

export default function AlgorithmInput({
  cubeOrder,
}: Pick<CommonFormProps, "cubeOrder">) {
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
              className={cn("input focus:input-primary w-full", {
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
