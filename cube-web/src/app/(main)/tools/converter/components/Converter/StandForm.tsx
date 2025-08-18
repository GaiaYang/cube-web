import React, { Fragment, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import { produce } from "immer";

import type {
  CommonFormProps,
  ConversionProfile,
  ConversionType,
} from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import { conversionFlags, conversionProfiles } from "./config";
import useConvertMap from "./hooks/useConvertMap";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";
import AlgorithmInput from "./AlgorithmInput";

export default function StandForm({ cubeOrder }: CommonFormProps) {
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

  function _renderForm(key?: ConversionType) {
    return (
      <Fragment key={key}>
        <AlgorithmInput cubeOrder={cubeOrder} />
        <AlgorithmResult />
        <ToolButtons />
      </Fragment>
    );
  }

  function _renderContent(item: ConversionProfile) {
    const _currentConver = _convertMap[item.id];

    return (
      <Fragment key={item.id}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {_currentConver ? (
          <Provider>
            <CoreFormContainer onConvert={_currentConver}>
              {_renderForm(item.id)}
            </CoreFormContainer>
          </Provider>
        ) : null}
      </Fragment>
    );
  }

  return <div>{enabledOptions.map(_renderContent)}</div>;
}

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
