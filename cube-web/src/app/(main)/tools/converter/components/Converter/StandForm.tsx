import React, { Fragment, memo } from "react";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

import type { ConversionProfile } from "./types";

import { type Schema } from "./form";
import useConvertMap from "./hooks/useConvertMap";
import useConversionFlags from "./hooks/useConversionFlags";
import useAlgorithmForm from "./hooks/useAlgorithmForm";

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
            <CoreFormContainer onConvert={convert} />
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

function CoreFormContainer({ onConvert }: CoreFormContainerProps) {
  const setAlgorithmString = useSetAtom(algorithmStringAtom);
  const form = useAlgorithmForm();

  const _submit: SubmitHandler<Schema> = (params) => {
    const result = onConvert(params.algorithm);
    setAlgorithmString(result);
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
        className="not-prose grid gap-4"
      >
        <AlgorithmInput />
        <AlgorithmResult />
        <ToolButtons />
      </form>
    </FormProvider>
  );
}

function ToolButtons() {
  return (
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
  );
}

function AlgorithmResult() {
  const algorithmString = useAtomValue(algorithmStringAtom);
  return <AlgorithmDisplay algorithm={algorithmString} />;
}
