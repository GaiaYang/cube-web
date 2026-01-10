import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues } from "react-hook-form";
import * as z from "zod";

export const schema = z.object({
  algorithm: z.string().min(1, "請輸入公式"),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: DefaultValues<Schema> = {
  algorithm: "",
};

export const resolver = zodResolver(schema);
