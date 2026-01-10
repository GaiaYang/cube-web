import type { ConversionType } from "../types";

export type CommonConversion = Extract<
  ConversionType,
  "mirror" | "reverse" | "rotate" | "mirrorRotate"
>;

export type Convert = Record<CommonConversion, (algorithm: string) => string> &
  Partial<
    Record<
      Exclude<ConversionType, CommonConversion>,
      (algorithm: string) => string
    >
  >;
