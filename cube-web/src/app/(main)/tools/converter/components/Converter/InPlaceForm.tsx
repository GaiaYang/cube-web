import React, { useMemo } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { produce } from "immer";

import type { CommonFormProps, ConversionType } from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import { conversionFlags, conversionProfiles } from "./config";
import useConvertMap from "./hooks/useConvertMap";

import AlgorithmInput from "./AlgorithmInput";

export default function InPlaceForm({ cubeOrder }: CommonFormProps) {
  const form = useForm<Schema>({ resolver, defaultValues });
  const _convertMap = useConvertMap(cubeOrder);

  const enabledOptions = useMemo(() => {
    const enabled = produce(conversionFlags, (draft) => {
      if (cubeOrder === "333") {
        draft.lower = true;
        draft.upper = true;
      }
    });
    return conversionProfiles.filter(({ id }) => enabled[id]);
  }, [cubeOrder]);

  function _submit(key: ConversionType) {
    return form.handleSubmit(({ algorithm }) => {
      let result = "";

      const conver = _convertMap[key];

      if (conver) {
        result = conver(algorithm);
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
        <AlgorithmInput cubeOrder={cubeOrder} />
        <div className="join join-vertical md:join-horizontal">
          {enabledOptions.map(({ subtitle, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => _submit(id)}
              className="btn join-item"
            >
              {subtitle}
            </button>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}
