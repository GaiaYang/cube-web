import { RotateCcwIcon } from "lucide-react";
import { FormProvider } from "react-hook-form";

import { Button } from "@/components/daisy-ui/button";
import { Join } from "@/components/daisy-ui/join";

import AlgorithmInput from "./AlgorithmInput";
import useAlgorithmForm from "./hooks/useAlgorithmForm";
import useConverterObject from "./hooks/useConverterObject";
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
          <Join className="join-vertical md:join-horizontal">
            {enabledProfiles.map(({ subtitle, id }) => (
              <Button
                key={id}
                type="button"
                joinItem
                onClick={() => {
                  convertInPlace(id);
                }}
              >
                {subtitle}
              </Button>
            ))}
          </Join>
          <Button type="reset" variant="soft" color="error">
            <RotateCcwIcon />
            重設
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
