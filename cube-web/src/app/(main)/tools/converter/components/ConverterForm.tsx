"use client";

import React from "react";

import {
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
} from "@/utils/cube/converter";

import FormContainer, { type FormContainerProps } from "./FormContainer";

/** 鏡像公式 */
export function MirrorForm() {
  return <FormContainer onConvert={mirrorAlgorithm} />;
}

/** 反轉公式 */
export function ReverseForm() {
  return <FormContainer onConvert={reverseAlgorithm} />;
}

/** 旋轉公式 */
export function RotateForm() {
  return <FormContainer onConvert={rotateAlgorithm} />;
}

/** 鏡像旋轉公式 */
export function MirrorRotateForm() {
  const onConvert: FormContainerProps["onConvert"] = (params) => {
    return rotateAlgorithm(mirrorAlgorithm(params));
  };

  return <FormContainer onConvert={onConvert} />;
}

/** 轉換成大寫公式 */
export function UpperForm() {
  return <FormContainer onConvert={upperAlgorithm} />;
}
/** 轉換成小寫公式 */
export function LowerForm() {
  return <FormContainer onConvert={lowerAlgorithm} />;
}
