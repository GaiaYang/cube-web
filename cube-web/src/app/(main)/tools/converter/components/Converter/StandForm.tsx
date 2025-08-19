import React, { Fragment, memo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

import type { ConversionProfile } from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import useConvertMap from "./hooks/useConvertMap";
import useConversionFlags from "./hooks/useConversionFlags";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";
import AlgorithmInput from "./AlgorithmInput";

export default memo(function StandForm() {
  const convertMap = useConvertMap();
  const conversions = useConversionFlags();

  function _renderContent(item: ConversionProfile) {
    const convert = convertMap[item.id];

    return (
      <Fragment key={item.id}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {convert ? (
          <Provider>
            <CoreFormContainer onConvert={convert}>
              <AlgorithmInput />
              <AlgorithmResult />
              <ToolButtons />
            </CoreFormContainer>
          </Provider>
        ) : null}
      </Fragment>
    );
  }

  return <div>{conversions.map(_renderContent)}</div>;
});

const algorithmStringAtom = atom("");

interface CoreFormContainerProps {
  onConvert: (params: string) => string;
}

function CoreFormContainer({
  onConvert,
  children,
}: React.PropsWithChildren<CoreFormContainerProps>) {
  const setAlgorithmString = useSetAtom(algorithmStringAtom);
  const form = useForm<Schema>({ resolver, defaultValues });

  const _submit: SubmitHandler<Schema> = (params) => {
    const result = onConvert(params.algorithm);

    if (result) {
      setAlgorithmString(result);
    } else {
      form.setError("algorithm", { message: "轉換失敗，請檢查格式是否正確" });
    }
  };

  const _reset: React.FormEventHandler<HTMLFormElement> = () => {
    form.reset();
    setAlgorithmString("");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(_submit)}
        onReset={_reset}
        className="not-prose grid gap-3"
      >
        {children}
      </form>
    </FormProvider>
  );
}

function ToolButtons() {
  return (
    <div className="flex gap-4">
      <button type="reset" className="btn btn-error btn-outline">
        <EraserIcon />
        清除
      </button>
      <button type="submit" className="btn btn-primary">
        <SendIcon />
        轉換
      </button>
    </div>
  );
}

function AlgorithmResult() {
  const algorithmString = useAtomValue(algorithmStringAtom);
  return <AlgorithmDisplay algorithm={algorithmString} />;
}
