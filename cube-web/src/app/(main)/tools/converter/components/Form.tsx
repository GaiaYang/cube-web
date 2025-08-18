"use client";

import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import { produce } from "immer";

import { CommonFormProps } from "./types";
import { inPlaceAtom } from "./jotai";

import FormContainer from "./FormContainer";
import InPlaceFormContainer from "./InPlaceFormContainer";

const initialEnabled = {
  /** 鏡像 */
  mirrorForm: true,
  /** 反轉 */
  reverseForm: true,
  /** 旋轉 */
  rotateForm: true,
  /** 鏡像旋轉 */
  mirrorRotateForm: true,
  /** 轉大寫 */
  upperForm: false,
  /** 轉小寫 */
  lowerForm: false,
};

export default function Form({ cubeLayer }: CommonFormProps) {
  const inPlace = useAtomValue(inPlaceAtom);
  const enabled = useMemo(() => {
    return produce(initialEnabled, (draft) => {
      if (cubeLayer === "333") {
        draft.upperForm = true;
        draft.lowerForm = true;
      }
    });
  }, [cubeLayer]);

  if (inPlace) {
    return (
      <InPlaceFormContainer cubeLayer={cubeLayer} enabledForms={enabled} />
    );
  }

  return (
    <FormContainer>
      {enabled.mirrorForm ? (
        <>
          <h3>鏡像公式</h3>
          <p>可將右手公式直接套用到左手，解決鏡像的兩種情況。</p>
          <MirrorForm />
        </>
      ) : null}
      {enabled.reverseForm ? (
        <>
          <h3>反轉公式</h3>
          <p>可讓你倒著執行整條公式，將完成的狀態回到初始位置。</p>
          <ReverseForm />
        </>
      ) : null}
      {enabled.rotateForm ? (
        <>
          <h3>旋轉公式</h3>
          <p>可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。</p>
          <RotateForm />
        </>
      ) : null}
      {enabled.mirrorRotateForm ? (
        <>
          <h3>鏡像旋轉公式</h3>
          <p>若公式有鏡像形式，可先左右鏡像再前後旋轉，得到同手的鏡像公式。</p>
          <MirrorRotateForm />
        </>
      ) : null}
      {enabled.upperForm ? (
        <>
          <h3>轉換成雙層大寫公式</h3>
          <p>將公式裡所有雙層符號替換成標準的大寫英文。</p>
          <UpperForm />
        </>
      ) : null}
      {enabled.lowerForm ? (
        <>
          <h3>轉換成雙層小寫公式</h3>
          <p>將公式裡所有雙層符號替換成大家習慣的小寫英文。</p>
          <LowerForm />
        </>
      ) : null}
    </FormContainer>
  );
}

function BasicForm() {}

function MirrorForm() {
  return <></>;
}

function ReverseForm() {
  return <></>;
}

function RotateForm() {
  return <></>;
}

function MirrorRotateForm() {
  return <></>;
}

function UpperForm() {
  return <></>;
}

function LowerForm() {
  return <></>;
}
