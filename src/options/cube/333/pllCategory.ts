import enumToOptions from "@/options/enumToOptions";
import { PLLCategory } from "@/enums/cube/333";

const { labels, options } = enumToOptions(PLLCategory, {
  [PLLCategory.ADJ_SWAP]: "相鄰交換",
  [PLLCategory.OPP_SWAP]: "對面交換",
  [PLLCategory.EPLL]: "邊塊排列",
});

export { labels, options };
