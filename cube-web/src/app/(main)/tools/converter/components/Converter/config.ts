import type { ConversionFlags, ConversionProfile, TabItem } from "./types";

export const conversionFlags: ConversionFlags = {
  mirror: true,
  reverse: true,
  rotate: true,
  mirrorRotate: true,
  upper: false,
  lower: false,
};

export const tabs: TabItem[] = [
  { id: "convert", label: "一般轉換器" },
  { id: "convert-333", label: "三階專屬轉換器" },
];

export const conversionProfiles: ConversionProfile[] = [
  {
    id: "mirror",
    title: "鏡像公式",
    subtitle: "鏡像",
    description: "可將右手公式直接套用到左手，解決鏡像的兩種情況。",
  },
  {
    id: "reverse",
    title: "反轉公式",
    subtitle: "反轉",
    description: "可讓你倒著執行整條公式，將完成的狀態回到初始位置。",
  },
  {
    id: "rotate",
    title: "旋轉公式",
    subtitle: "旋轉",
    description: "可將步驟轉換成在方塊旋轉 y2 後仍能得到相同結果的公式。",
  },
  {
    id: "mirrorRotate",
    title: "鏡像旋轉公式",
    subtitle: "鏡像旋轉",
    description:
      "若公式有鏡像形式，可先左右鏡像再前後旋轉，得到同手的鏡像公式。",
  },
  {
    id: "upper",
    title: "雙層轉換成大寫公式",
    subtitle: "雙層轉換成大寫",
    description: "將公式裡所有雙層符號替換成標準的大寫英文。",
  },
  {
    id: "lower",
    title: "雙層轉換成小寫公式",
    subtitle: "雙層轉換成小寫",
    description: "將公式裡所有雙層符號替換成大家習慣的小寫英文。",
  },
];
