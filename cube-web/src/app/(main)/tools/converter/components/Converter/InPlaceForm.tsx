import React, { memo } from "react";

import { FormProvider, useForm } from "react-hook-form";

import type { CommonFormProps, ConversionType } from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import useConvertMap from "./hooks/useConvertMap";
import useConversionFlags from "./hooks/useConversionFlags";

import AlgorithmInput from "./AlgorithmInput";

export default memo(function InPlaceForm({ cubeOrder }: CommonFormProps) {
  const form = useForm<Schema>({ resolver, defaultValues });
  const convertMap = useConvertMap(cubeOrder);
  const conversions = useConversionFlags({ cubeOrder });

  function _reset() {
    form.reset();
  }

  function _submit(key: ConversionType) {
    return form.handleSubmit(({ algorithm }) => {
      let result = "";
      const convert = convertMap[key];
      if (convert) {
        result = convert(algorithm);
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
      <form onReset={_reset} className="not-prose mt-5 grid gap-3">
        <AlgorithmInput cubeOrder={cubeOrder} />
        <div className="join join-vertical md:join-horizontal">
          <button type="reset" className="btn join-item btn-error">
            重設
          </button>
          {conversions.map(({ subtitle, id }) => (
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
});
