import { FormProvider } from "react-hook-form";
import { RotateCcwIcon } from "lucide-react";

import useAlgorithmForm from "./hooks/useAlgorithmForm";
import useConverterObject from "./hooks/useConverterObject";
import AlgorithmInput from "./AlgorithmInput";
import type { ConversionType } from "./types";

/** 原地轉換表單 */
export default function InPlaceForm() {
  const form = useAlgorithmForm();
  const { conversionMap, enabledProfiles } = useConverterObject();

  function convertInPlace(id: ConversionType) {
    void form.handleSubmit(({ algorithm }) => {
      const convert = conversionMap[id];
      if (convert) {
        form.setValue("algorithm", convert(algorithm));
      }
    })();
  }

  return (
    <FormProvider {...form}>
      <form
        onReset={() => {
          form.reset();
        }}
        className="not-prose mt-5 grid gap-4"
      >
        <AlgorithmInput />
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="join join-vertical md:join-horizontal">
            {enabledProfiles.map(({ subtitle, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  convertInPlace(id);
                }}
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
}
