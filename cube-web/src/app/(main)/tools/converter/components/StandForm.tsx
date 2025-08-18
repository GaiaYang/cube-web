import React, { useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import { produce } from "immer";

import type { CommonFormProps } from "./types";

import { type Schema, resolver, defaultValues } from "./form";
import { enabledEvent } from "./config";
import useConvert from "./hooks/useConvert";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";
import AlgorithmInput from "./AlgorithmInput";

export default function StandForm({ cubeLayer }: CommonFormProps) {
  const _convert = useConvert(cubeLayer);

  const enabled = useMemo(
    () =>
      produce(enabledEvent, (draft) => {
        if (cubeLayer === "333") {
          draft.lower = true;
          draft.upper = true;
        }
      }),
    [cubeLayer],
  );

  function _renderForm() {
    return (
      <>
        <AlgorithmInput cubeLayer={cubeLayer} />
        <AlgorithmResult />
        <ToolButtons />
      </>
    );
  }

  return (
    <div>
      {enabled.mirror ? (
        <>
          <h2>鏡像公式</h2>
          <p>可將右手公式直接套用到左手，解決鏡像的兩種情況。</p>
          <Provider>
            <CoreFormContainer onConvert={_convert.mirrorAlgorithm}>
              {_renderForm()}
            </CoreFormContainer>
          </Provider>
        </>
      ) : null}
      {enabled.reverse ? (
        <>
          <h2>反轉公式</h2>
          <p>可讓你倒著執行整條公式，將完成的狀態回到初始位置。</p>
          <Provider>
            <CoreFormContainer onConvert={_convert.reverseAlgorithm}>
              {_renderForm()}
            </CoreFormContainer>
          </Provider>
        </>
      ) : null}
      {enabled.rotate ? (
        <>
          <h2>旋轉公式</h2>
          <p>可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。</p>
        </>
      ) : null}
      {enabled.mirrorRotate ? (
        <>
          <h2>鏡像旋轉公式</h2>
          <p>若公式有鏡像形式，可先左右鏡像再前後旋轉，得到同手的鏡像公式。</p>
        </>
      ) : null}
      {enabled.upper ? (
        <>
          <h2>轉換成雙層大寫公式</h2>
          <p>將公式裡所有雙層符號替換成標準的大寫英文。</p>
        </>
      ) : null}
      {enabled.lower ? (
        <>
          <h2>轉換成雙層小寫公式</h2>
          <p>將公式裡所有雙層符號替換成大家習慣的小寫英文。</p>
        </>
      ) : null}
    </div>
  );
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

    if (!result) {
      form.setError("algorithm", { message: "轉換失敗，請檢查格式是否正確" });
      return;
    }
    setAlgorithmString(result);
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
