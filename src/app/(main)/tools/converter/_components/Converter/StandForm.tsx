import { useState } from "react";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";

import useAlgorithmForm from "./hooks/useAlgorithmForm";
import useConverterObject from "./hooks/useConverterObject";
import AlgorithmInput from "./AlgorithmInput";
import { type Schema } from "./form";

import AlgorithmDisplay from "@/components/cube/algorithms/AlgorithmDisplay";

/** 標準轉換表單 */
export default function StandForm() {
  const { conversionMap, enabledProfiles } = useConverterObject();

  return (
    <div>
      {enabledProfiles.map((item) => {
        const convert = conversionMap[item.id];
        if (!convert) return null;

        return (
          <section key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <CoreForm onConvert={convert} />
          </section>
        );
      })}
    </div>
  );
}

interface CoreFormProps {
  onConvert: (algorithm: string) => string;
}

function CoreForm({ onConvert }: CoreFormProps) {
  const [result, setResult] = useState("");
  const form = useAlgorithmForm();

  const onSubmit: SubmitHandler<Schema> = ({ algorithm }) => {
    setResult(onConvert(algorithm));
  };

  const onReset = () => {
    form.reset();
    setResult("");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="not-prose grid gap-3"
      >
        <AlgorithmInput />
        <AlgorithmDisplay algorithm={result} />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            <SendIcon />
            轉換
          </button>
          <button type="reset" className="btn btn-error btn-soft">
            <EraserIcon />
            清除
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
