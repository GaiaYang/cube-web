import { memo } from "react";
import { Control, Controller } from "react-hook-form";

import { type Schema } from "./form";
import cn from "@/utils/cn";
import { useConverterProps } from "./context";

export default memo(function AlgorithmInput() {
  const { cubeOrder } = useConverterProps();

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
              // 關閉自動完成
              autoComplete="off"
              // 關閉拼字檢查
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
});
