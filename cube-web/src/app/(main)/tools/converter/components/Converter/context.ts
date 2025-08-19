import { createContext, useContext } from "react";

import type { CommonFormProps } from "./types";

export const ConverterPropsContext = createContext<CommonFormProps>({
  cubeOrder: "nnn",
});

export function useConverterProps() {
  return useContext(ConverterPropsContext);
}
