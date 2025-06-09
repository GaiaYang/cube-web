import type { Option } from "@/options/types";

/**
 * 根據 enum 與 label 對照表產生 labels 與 options
 * @param enumObj 列舉
 * @param labelMap 標籤對照表
 * @returns 包含 labels 與 options 的物件
 */
export default function enumToOptions<
  T extends Record<string, string | number>,
>(enumObj: T, labelMap: Partial<Record<T[keyof T], string>>) {
  const labels: Record<T[keyof T], string> = {} as any;
  const options: Option<T[keyof T]>[] = [];

  for (const key of Object.keys(enumObj)) {
    const value = enumObj[key as keyof T];
    const label = labelMap[value];
    if (label) {
      labels[value] = label;
      options.push({
        id: value,
        value,
        label,
      });
    }
  }

  return { labels, options };
}
