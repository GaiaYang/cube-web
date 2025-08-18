import React, { useMemo } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { produce } from "immer";

import type { Option } from "@/options/types";
import type { CommonFormProps, ConvertOption } from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import { enabledEvent } from "./config";
import useConvert from "./hooks/useConvert";

import AlgorithmInput from "./AlgorithmInput";

export default function InPlaceForm({ cubeLayer }: CommonFormProps) {
  const form = useForm<Schema>({ resolver, defaultValues });
  const _convert = useConvert(cubeLayer);

  const enabled = useMemo(
    () =>
      produce(enabledEvent, (draft) => {
        if (cubeLayer === "333") {
          draft.lower = true;
          draft.upper = true;
        }
      }),
    [cubeLayer],
  );

  const enabledOptions = useMemo(
    () => options.filter(({ value }) => enabled[value]),
    [enabled],
  );

  function _submit(key: ConvertOption) {
    return form.handleSubmit(({ algorithm }) => {
      let result = "";
      switch (key) {
        case "mirror":
          result = _convert.mirrorAlgorithm(algorithm);
          break;
        case "reverse":
          result = _convert.reverseAlgorithm(algorithm);
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

      if (result) {
        form.setValue("algorithm", result);
      } else {
        form.setError("algorithm", { message: "轉換失敗，請檢查格式是否正確" });
      }
    })();
  }

  return (
    <FormProvider {...form}>
      <form className="not-prose mt-5 grid gap-3">
        <AlgorithmInput cubeLayer={cubeLayer} />
        <div className="join">
          {enabledOptions.map(({ label, id, value }) => (
            <button
              key={id}
              type="button"
              onClick={() => _submit(value)}
              className="btn join-item"
            >
              {label}
            </button>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}

const options: Option<ConvertOption>[] = [
  {
    id: "mirror",
    label: "鏡像",
    value: "mirror",
  },
  {
    id: "reverse",
    label: "反轉",
    value: "reverse",
  },
  {
    id: "rotate",
    label: "旋轉y2",
    value: "rotate",
  },
  {
    id: "mirrorRotate",
    label: "鏡像旋轉y2",
    value: "mirrorRotate",
  },
  {
    id: "upper",
    label: "多層大寫",
    value: "upper",
  },
  {
    id: "lower",
    label: "多層小寫",
    value: "lower",
  },
];
