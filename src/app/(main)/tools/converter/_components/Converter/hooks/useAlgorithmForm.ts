import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";

import { cubeOrderAtom } from "../jotai";
import { converterCores } from "../utils/converters";

import { defaultValues, type Schema, schema } from "@/forms/algorithmInput";
import getOrDefault from "@/utils/getOrDefault";

export default function useAlgorithmForm() {
  const cubeOrder = useAtomValue(cubeOrderAtom);

  const resolver = useMemo(
    () =>
      zodResolver(
        schema.superRefine(({ algorithm }, ctx) => {
          const { parseAlgorithm } = getOrDefault(
            converterCores,
            "nnn",
            cubeOrder,
          );

          if (parseAlgorithm(algorithm).length === 0) {
            ctx.addIssue({
              code: "custom",
              message: "請輸入正確格式",
              path: ["algorithm"],
            });
          }
        }),
      ),
    [cubeOrder],
  );

  return useForm<Schema>({
    resolver,
    defaultValues,
  });
}
