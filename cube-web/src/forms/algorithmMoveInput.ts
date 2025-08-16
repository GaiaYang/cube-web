import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BASIC_CODES } from "@/utils/cube/converter";

/** 公式單一步驟輸入 */
export const schema = z.object({
  layerCount: z.number().int().nullable(),
  code: z.union([z.enum(BASIC_CODES), z.literal("")]),
  isPrime: z.boolean(),
  turns: z.number().int(),
});
/** 公式單一步驟輸入類型 */
export type Schema = z.infer<typeof schema>;
/** 公式單一步驟輸入預設值 */
export const defaultValues: Schema = {
  layerCount: null,
  code: "",
  isPrime: false,
  turns: 0,
};
/** 公式單一步驟輸入解析器 */
export const resolver = zodResolver(schema);
