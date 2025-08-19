import React, { memo } from "react";

import { FormProvider, SubmitHandler } from "react-hook-form";

import type { ConversionType } from "./types";

import { type Schema } from "./form";
import useConvertMap from "./hooks/useConvertMap";
import useConversionFlags from "./hooks/useConversionFlags";
import useAlgorithmForm from "./hooks/useAlgorithmForm";

import AlgorithmInput from "./AlgorithmInput";

export default memo(function InPlaceForm() {
  const form = useAlgorithmForm();
  const convertMap = useConvertMap();
  const conversions = useConversionFlags();

  function _reset() {
    form.reset();
  }

  const _submit: SubmitHandler<Schema> = ({ algorithm }, event) => {
    const key = (event?.target as HTMLButtonElement)?.value as ConversionType;
    let result = "";
    const convert = convertMap[key];
    if (convert) {
      result = convert(algorithm);
    }

    form.setValue("algorithm", result);
  };

  return (
    <FormProvider {...form}>
      <form onReset={_reset} className="not-prose mt-5 grid gap-3">
        <AlgorithmInput />
        <div className="join join-vertical md:join-horizontal">
          <button type="reset" className="btn join-item btn-error">
            重設
          </button>
          {conversions.map(({ subtitle, id }) => (
            <button
              key={id}
              value={id}
              type="button"
              onClick={form.handleSubmit(_submit)}
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
