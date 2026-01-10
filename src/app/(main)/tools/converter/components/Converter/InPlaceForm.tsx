import { memo } from "react";
import { RotateCcwIcon } from "lucide-react";
import { FormProvider, SubmitHandler } from "react-hook-form";

import type { ConversionType } from "./types";

import { type Schema } from "./form";
import useAlgorithmForm from "./hooks/useAlgorithmForm";
import useConverterObject from "./hooks/useConverterObject";

import AlgorithmInput from "./AlgorithmInput";

export default memo(function InPlaceForm() {
  const form = useAlgorithmForm();
  const { conversionMap, enabledProfiles } = useConverterObject();

  function _reset() {
    form.reset();
  }

  const _submit: SubmitHandler<Schema> = ({ algorithm }, event) => {
    const key = (event?.target as HTMLButtonElement)?.value as ConversionType;
    let result = "";
    const convert = conversionMap[key];
    if (convert) {
      result = convert(algorithm);
    }

    form.setValue("algorithm", result);
  };

  return (
    <FormProvider {...form}>
      <form onReset={_reset} className="not-prose mt-5 grid gap-4">
        <AlgorithmInput />
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="join join-vertical md:join-horizontal">
            {enabledProfiles.map(({ subtitle, id }) => (
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
          <button type="reset" className="btn btn-soft btn-error">
            <RotateCcwIcon />
            重設
          </button>
        </div>
      </form>
    </FormProvider>
  );
});
