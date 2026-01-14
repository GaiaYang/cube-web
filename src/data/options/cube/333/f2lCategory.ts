import enumToOptions from "@/data/options/enumToOptions";
import { F2LCategory } from "@/enums/cube/333";

const { labels, options } = enumToOptions(F2LCategory, {
  [F2LCategory.CONNECTED_PAIRS]: "已連接的對組",
  [F2LCategory.CORNER_IN_SLOT]: "角塊已在正確位置",
  [F2LCategory.DISCONNECTED_PAIRS]: "尚未連接的對組",
  [F2LCategory.EDGE_IN_SLOT]: "邊塊已在正確位置",
  [F2LCategory.FREE_PAIRS]: "可自由移動的對組",
  [F2LCategory.PIECES_IN_SLOT]: "對組在插槽中",
});

export { labels, options };
