import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { CornerDownLeftIcon, RotateCcwIcon } from "lucide-react";

import cn from "@/utils/cn";
import {
  mergeMovesToAlgorithm,
  type AlgorithmInput,
  type Move,
} from "@/utils/cube/converter";
import {
  type Schema,
  resolver,
  defaultValues,
} from "@/forms/algorithmConverterInput";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";

export interface FormContainerProps {
  onConvert: (params: AlgorithmInput) => Move[];
}

/** 統一輸入表單容器 */
export default function FormContainer({ onConvert }: FormContainerProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<Schema>({
    resolver,
    defaultValues,
  });
  const [algorithm, setAlgorithm] = useState("");

  const _onSubmit: SubmitHandler<Schema> = (data) => {
    setAlgorithm(mergeMovesToAlgorithm(onConvert(data.algorithm)));
  };

  const _onReset: React.FormEventHandler<HTMLFormElement> = () => {
    reset();
    setAlgorithm("");
  };

  return (
    <form
      onSubmit={handleSubmit(_onSubmit)}
      onReset={_onReset}
      className={cn("not-prose", "grid grid-cols-1 gap-4")}
    >
      <Controller
        control={control}
        name="algorithm"
        render={({ field, fieldState: { error } }) => {
          const isError = error !== undefined;
          return (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">公式符號</legend>
              <input
                {...field}
                type="text"
                className={cn("input focus:input-primary w-full font-mono", {
                  "input-error": isError,
                })}
                placeholder="R U R' U'"
              />
              <p className={cn("label", { "text-error": isError })}>
                {error?.message || "接受官方或非官方符號"}
              </p>
            </fieldset>
          );
        }}
      />
      <AlgorithmDisplay algorithm={algorithm} placeholder="等待公式轉換..." />
      <div className="flex w-full gap-2">
        <button
          type="reset"
          className="btn btn-outline btn-error"
          disabled={!isDirty}
        >
          <RotateCcwIcon />
          重設
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isDirty}>
          <CornerDownLeftIcon />
          轉換
        </button>
      </div>
    </form>
  );
}
