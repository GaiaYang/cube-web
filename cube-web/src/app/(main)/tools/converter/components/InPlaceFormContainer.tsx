import React from "react";
import { Control, Controller, FormProvider, useForm } from "react-hook-form";

import type { CommonFormProps } from "./types";
import cn from "@/utils/cn";
import { type Schema, defaultValues, resolver } from "@/forms/algorithmInput";

/** 原地複寫型表單 */
export default function InPlaceFormContainer({
  enabledForms,
}: CommonFormProps) {
  const form = useForm<Schema>({ defaultValues, resolver });

  return (
    <FormProvider {...form}>
      <form className="not-prose">
        <AlgorithmInput />
        <ToolButtons enabledForms={enabledForms} />
      </form>
    </FormProvider>
  );
}

function AlgorithmInput() {
  return (
    <Controller
      control={undefined as unknown as Control<Schema>}
      name="algorithm"
      render={({ field, fieldState: { error } }) => {
        const isError = error !== undefined;

        return (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">公式輸入</legend>
            <input
              {...field}
              type="text"
              className={cn("input focus:input-primary w-full", {
                "input-error": isError,
              })}
              placeholder="R U R' U'"
            />
            {isError ? (
              <p className="label text-error">{error?.message}</p>
            ) : null}
          </fieldset>
        );
      }}
    />
  );
}

interface ToolOption {
  key: string;
  label: string;
  enabled: boolean;
}

function ToolButtons({ enabledForms }: Pick<CommonFormProps, "enabledForms">) {
  const options: ToolOption[] = [
    {
      key: "mirror",
      label: "鏡像",
      enabled: Boolean(enabledForms?.mirrorForm),
    },
    {
      key: "reverse",
      label: "反轉",
      enabled: Boolean(enabledForms?.reverseForm),
    },
    {
      key: "rotate",
      label: "旋轉y2",
      enabled: Boolean(enabledForms?.rotateForm),
    },
    {
      key: "mirrorRotate",
      label: "鏡像旋轉y2",
      enabled: Boolean(enabledForms?.mirrorRotateForm),
    },
    {
      key: "upper",
      label: "多層符號大寫",
      enabled: Boolean(enabledForms?.upperForm),
    },
    {
      key: "lower",
      label: "多層符號小寫",
      enabled: Boolean(enabledForms?.lowerForm),
    },
  ].filter(({ enabled }) => enabled);

  return (
    <div className="join join-vertical sm:join-horizontal w-full">
      {options.map(({ label, key }) => (
        <button key={key} type="button" className="btn join-item">
          {label}
        </button>
      ))}
    </div>
  );
}
