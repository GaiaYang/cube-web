import React from "react";
import { Control, Controller, useForm } from "react-hook-form";

import type { CommonFormProps, EnabledOption } from "./types";
import cn from "@/utils/cn";
import { type Schema, defaultValues, resolver } from "@/forms/algorithmInput";
import convert333 from "./utils/convert333";
import convert from "./utils/convert";

export interface InPlaceFormContainerProps extends CommonFormProps {
  enabledForms: EnabledOption;
}

/** 原地複寫型表單 */
export default function InPlaceFormContainer({
  cubeLayer,
  enabledForms,
}: InPlaceFormContainerProps) {
  const { control, setValue, handleSubmit, setError } = useForm<Schema>({
    defaultValues,
    resolver,
  });

  async function _convert(key: string) {
    return handleSubmit(({ algorithm }) => {
      let output = "";
      switch (cubeLayer) {
        case "333":
          switch (key) {
            case "mirror":
              output = convert333.mirrorAlgorithm(algorithm);
              break;
            case "reverse":
              break;
            case "rotate":
              break;
            case "mirrorRotate":
              break;
            case "upper":
              break;
            case "lower":
              break;
            default:
              break;
          }
          break;
        case "nnn":
        default:
          switch (key) {
            case "mirror":
              output = convert.mirrorAlgorithm(algorithm);
              break;
            case "reverse":
              break;
            case "rotate":
              break;
            case "mirrorRotate":
              break;
            case "upper":
              break;
            case "lower":
              break;
            default:
              break;
          }
          break;
      }

      if (output) {
        setValue("algorithm", output);
      } else {
        setError("algorithm", { message: "轉換失敗，請檢查格式是否正確" });
      }
    })();
  }

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
    <form className="not-prose grid gap-2">
      <Controller
        control={control}
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
      <div className="join join-vertical md:join-horizontal w-full">
        {options.map(({ label, key }) => (
          <button
            key={key}
            type="button"
            className="btn join-item"
            onClick={() => _convert(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </form>
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
