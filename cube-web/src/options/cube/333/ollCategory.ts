import enumToOptions from "@/options/enumToOptions";
import { OLLCategory } from "@/schema/cube/enum/333";

const { labels, options } = enumToOptions(OLLCategory, {
  [OLLCategory.DOT_CASE]: "點型",
  [OLLCategory.SQUARE_SHAPES]: "方塊型",
  [OLLCategory.LIGHTNING_SHAPES]: "閃電型",
  [OLLCategory.FISH_SHAPES]: "魚型",
  [OLLCategory.KNIGHT_MOVE_SHAPES]: "騎士移動型",
  [OLLCategory.OCLL]: "角塊定向",
  [OLLCategory.ALL_CORNERS_ORIENTED]: "全角朝上",
  [OLLCategory.AWKWARD_SHAPES]: "不規則型",
  [OLLCategory.P_SHAPES]: "P型",
  [OLLCategory.T_SHAPES]: "T型",
  [OLLCategory.C_SHAPES]: "C型",
  [OLLCategory.W_SHAPES]: "W型",
  [OLLCategory.L_SHAPES]: "L型",
  [OLLCategory.LINE_SHAPES]: "線型",
});

export { labels, options };
