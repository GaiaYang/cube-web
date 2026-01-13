import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useConverterProps } from "../context";
import convertMap from "../utils/convertMap";
import { defaultValues, schema, type Schema } from "../form";
import getOrDefault from "@/utils/getOrDefault";

export default function useAlgorithmForm() {
  const { cubeOrder } = useConverterProps();

  // 根據 cubeOrder 動態生成 schema
  const dynamicSchema = useMemo(() => {
    return schema.superRefine(({ algorithm }, ctx) => {
      const { parseAlgorithm } = getOrDefault(convertMap, "nnn", cubeOrder);
      const parsed = parseAlgorithm(algorithm);

      if (parsed.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "請輸入正確格式",
          path: ["algorithm"],
        });
      }
    });
  }, [cubeOrder]);

  return useForm<Schema>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
  });
}
