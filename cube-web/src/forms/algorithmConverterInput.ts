import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { isAlgorithmValid } from "@/utils/cube/converter";

/** 公式轉換器輸入 */
export const schema = z.object({
  algorithm: z
    .string()
    .min(1, "請輸入公式")
    .refine((value) => isAlgorithmValid(value), {
      error: "公式格式錯誤",
    }),
});
/** 公式轉換器輸入類型 */
export type Schema = z.infer<typeof schema>;
/** 公式轉換器輸入預設值 */
export const defaultValues: Schema = {
  algorithm: "",
};
/** 公式轉換器輸入解析器 */
export const resolver = zodResolver(schema);
