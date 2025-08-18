import React from "react";
import {
  Control,
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { EraserIcon, SendIcon } from "lucide-react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

import type { CommonFormProps } from "./types";

import cn from "@/utils/cn";
import { type Schema, resolver, defaultValues } from "@/forms/algorithmInput";
import convert from "./utils/convert";
import convert333 from "./utils/convert333";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";

export default function StandForm({ cubeLayer }: CommonFormProps) {
  const _convert = cubeLayer === "nnn" ? convert : convert333;

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
      <h2>鏡像公式</h2>
      <p>可將右手公式直接套用到左手，解決鏡像的兩種情況。</p>
      <Provider>
        <CoreFormContainer onConvert={_convert.mirrorAlgorithm}>
          {_renderForm()}
        </CoreFormContainer>
      </Provider>
      <h2>反轉公式</h2>
      <p>可讓你倒著執行整條公式，將完成的狀態回到初始位置。</p>

      <h2>旋轉公式</h2>
      <p>可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。</p>

      <h2>鏡像旋轉公式</h2>
      <p>若公式有鏡像形式，可先左右鏡像再前後旋轉，得到同手的鏡像公式。</p>

      <h2>轉換成雙層大寫公式</h2>
      <p>將公式裡所有雙層符號替換成標準的大寫英文。</p>

      <h2>轉換成雙層小寫公式</h2>
      <p>將公式裡所有雙層符號替換成大家習慣的小寫英文。</p>
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

function AlgorithmInput({ cubeLayer }: Pick<CommonFormProps, "cubeLayer">) {
  return (
    <Controller
      control={undefined as unknown as Control<Schema>}
      name="algorithm"
      render={({ field, fieldState: { error } }) => {
        const isError = Boolean(error);

        return (
          <fieldset className="fieldset">
            <input
              {...field}
              type="text"
              className={cn("input focus:input-primary", {
                "input-error": isError,
              })}
              placeholder="R U R' U'"
            />
            <p className={cn("label", { "text-error": isError })}>
              {error?.message ??
                (cubeLayer === "nnn" ? "允許官方符號" : "允許官方跟非官方符號")}
            </p>
          </fieldset>
        );
      }}
    />
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
