import enumToOptions from "@/options/enumToOptions";
import { CubeFaceColors } from "@/enums/cube/color";

const { labels, options } = enumToOptions(CubeFaceColors, {
  [CubeFaceColors.WHITE]: "白色",
  [CubeFaceColors.YELLOW]: "黃色",
  [CubeFaceColors.GREEN]: "綠色",
  [CubeFaceColors.BLUE]: "藍色",
  [CubeFaceColors.RED]: "紅色",
  [CubeFaceColors.ORANGE]: "橘色",
  [CubeFaceColors.NONE]: "無",
});

export { labels, options };
