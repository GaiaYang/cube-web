import enumToOptions from "@/data/options/enumToOptions";
import { F2LCategory } from "@/enums/cube/333";
import type {
  CubeBlockPosition3D,
  CubeFaceCode,
  F2LCaseId,
  F2LDefinition,
} from "@/types/cube/333";

export type { F2LCaseId, F2LDefinition };

/** 固定上色（FR 槽位已解好的面） */
const fixedPattern = {
  "F-CC": "F",
  "F-CL": "F",
  "F-BL": "F",
  "F-BC": "F",
  "S-CC": "R",
  "S-CR": "R",
  "S-BC": "R",
  "S-BR": "R",
} as const satisfies Partial<Record<CubeBlockPosition3D, CubeFaceCode>>;

function define(
  id: F2LCaseId,
  category: F2LCategory,
  setupAlgorithm: string,
  pattern: Partial<Record<CubeBlockPosition3D, CubeFaceCode>>,
  algorithms: string[] = [],
): F2LDefinition {
  return {
    id,
    name: id,
    category,
    setupAlgorithm,
    algorithms,
    pattern: { ...fixedPattern, ...pattern },
  };
}

export const definitions: F2LDefinition[] = [
  define("1", F2LCategory.FREE_PAIRS, "F R' F' R", {
    "U-CR": "F",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
    "S-TC": "R",
  }),
  define("2", F2LCategory.FREE_PAIRS, "R' F R F'", {
    "U-BC": "R",
    "U-BR": "R",
    "F-TC": "F",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("3", F2LCategory.FREE_PAIRS, "F' U F", {
    "U-CL": "R",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("4", F2LCategory.FREE_PAIRS, "R U' R'", {
    "U-TC": "F",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("5", F2LCategory.DISCONNECTED_PAIRS, "R U R' U2' R U' R' U", {
    "U-TC": "F",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("6", F2LCategory.DISCONNECTED_PAIRS, "F' U' F U2' F' U F U'", {
    "U-CL": "R",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("7", F2LCategory.DISCONNECTED_PAIRS, "R U R' U2' R U2' R' U", {
    "U-CL": "F",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("8", F2LCategory.DISCONNECTED_PAIRS, "r' U' R2 U' R2' U2' r", {
    "U-TC": "R",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("9", F2LCategory.DISCONNECTED_PAIRS, "F' U F U' R U R' U", {
    "U-TC": "R",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("10", F2LCategory.DISCONNECTED_PAIRS, "R U' R' U' R U' R' U", {
    "U-CL": "F",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("11", F2LCategory.CONNECTED_PAIRS, "F' U F U' R U2' R' U", {
    "U-CR": "R",
    "U-BR": "F",
    "F-TR": "D",
    "S-TL": "R",
    "S-TC": "F",
  }),
  define("12", F2LCategory.CONNECTED_PAIRS, "R U R' U2' R U R' U' R U R'", {
    "U-BC": "F",
    "U-BR": "R",
    "F-TC": "R",
    "F-TR": "F",
    "S-TL": "D",
  }),
  define("13", F2LCategory.CONNECTED_PAIRS, "r U2' R' U R U' R' U M", {
    "U-BC": "R",
    "U-BR": "F",
    "F-TC": "F",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("14", F2LCategory.CONNECTED_PAIRS, "R U' R' U' R U R' U", {
    "U-CR": "F",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
    "S-TC": "R",
  }),
  define("15", F2LCategory.CONNECTED_PAIRS, "R U R' U' R U R' U2' R U' R'", {
    "U-BC": "F",
    "U-BR": "F",
    "F-TC": "R",
    "F-TR": "D",
    "S-TL": "R",
  }),
  define("16", F2LCategory.CONNECTED_PAIRS, "F' U F U2' R U R'", {
    "U-CR": "R",
    "U-BR": "R",
    "F-TR": "F",
    "S-TL": "D",
    "S-TC": "F",
  }),
  define("17", F2LCategory.CONNECTED_PAIRS, "R U' R' U R U2' R'", {
    "U-CR": "F",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
    "S-TC": "R",
  }),
  define("18", F2LCategory.CONNECTED_PAIRS, "R U R' U' R U R' F R' F' R", {
    "U-BC": "R",
    "U-BR": "D",
    "F-TC": "F",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("19", F2LCategory.DISCONNECTED_PAIRS, "R U R' U' R U2' R' U'", {
    "U-TC": "F",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("20", F2LCategory.DISCONNECTED_PAIRS, "R U R' F R' F' R2' U R' U", {
    "U-CL": "R",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("21", F2LCategory.DISCONNECTED_PAIRS, "R U' R' U2' R U R'", {
    "U-CL": "F",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("22", F2LCategory.DISCONNECTED_PAIRS, "F' L' U2' L F", {
    "U-TC": "R",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("23", F2LCategory.CONNECTED_PAIRS, "R U' R' U R U' R' U2' R U' R'", {
    "U-BC": "F",
    "U-BR": "D",
    "F-TC": "R",
    "F-TR": "R",
    "S-TL": "F",
  }),
  define("24", F2LCategory.CONNECTED_PAIRS, "R U R' F R U R' U' F'", {
    "U-CR": "R",
    "U-BR": "D",
    "F-TR": "R",
    "S-TL": "F",
    "S-TC": "F",
  }),
  define("25", F2LCategory.CORNER_IN_SLOT, "F' R U R' U' R' F R", {
    "U-CR": "F",
    "F-BR": "F",
    "S-TC": "R",
    "S-BL": "R",
  }),
  define("26", F2LCategory.CORNER_IN_SLOT, "F' U' F U R U R' U'", {
    "U-BC": "R",
    "F-TC": "F",
    "F-BR": "F",
    "S-BL": "R",
  }),
  define("27", F2LCategory.CORNER_IN_SLOT, "R U R' U' R U R'", {
    "U-CR": "F",
    "F-BR": "D",
    "S-TC": "R",
    "S-BL": "F",
  }),
  define("28", F2LCategory.CORNER_IN_SLOT, "R' F R F' U R U' R'", {
    "U-BC": "R",
    "F-TC": "F",
    "F-BR": "R",
    "S-BL": "D",
  }),
  define("29", F2LCategory.CORNER_IN_SLOT, "F R' F' R F R' F' R", {
    "U-BC": "R",
    "F-TC": "F",
    "F-BR": "D",
    "S-BL": "F",
  }),
  define("30", F2LCategory.CORNER_IN_SLOT, "R U' R' U R U' R'", {
    "U-CR": "F",
    "F-BR": "R",
    "S-TC": "R",
    "S-BL": "D",
  }),
  define("31", F2LCategory.EDGE_IN_SLOT, "R U R' F R' F' R U", {
    "U-BR": "D",
    "F-TR": "R",
    "F-CR": "R",
    "S-TL": "F",
    "S-CL": "F",
  }),
  define("32", F2LCategory.EDGE_IN_SLOT, "R U' R' U R U' R' U R U' R'", {
    "U-BR": "D",
    "F-TR": "R",
    "F-CR": "F",
    "S-TL": "F",
    "S-CL": "R",
  }),
  define("33", F2LCategory.EDGE_IN_SLOT, "R U R' U2' R U R' U", {
    "U-BR": "F",
    "F-TR": "D",
    "F-CR": "F",
    "S-TL": "R",
    "S-CL": "R",
  }),
  define("34", F2LCategory.EDGE_IN_SLOT, "R U' R' U2' R U' R' U'", {
    "U-BR": "R",
    "F-TR": "F",
    "F-CR": "F",
    "S-TL": "D",
    "S-CL": "R",
  }),
  define("35", F2LCategory.EDGE_IN_SLOT, "F' U F U' R U' R' U", {
    "U-BR": "F",
    "F-TR": "D",
    "F-CR": "R",
    "S-TL": "R",
    "S-CL": "F",
  }),
  define("36", F2LCategory.EDGE_IN_SLOT, "R U' R' U2' F R' F' R U2'", {
    "U-BR": "R",
    "F-TR": "F",
    "F-CR": "R",
    "S-TL": "D",
    "S-CL": "F",
  }),
  define("37", F2LCategory.PIECES_IN_SLOT, "R U' R U2' F R2' F' U2' R2'", {
    "F-CR": "R",
    "F-BR": "F",
    "S-CL": "F",
    "S-BL": "R",
  }),
  define("38", F2LCategory.PIECES_IN_SLOT, "R U' R' U R U2' R' U R U' R'", {
    "F-CR": "F",
    "F-BR": "D",
    "S-CL": "R",
    "S-BL": "F",
  }),
  define("39", F2LCategory.PIECES_IN_SLOT, "R U' R' U' R U R' U2' R U' R'", {
    "F-CR": "F",
    "F-BR": "R",
    "S-CL": "R",
    "S-BL": "D",
  }),
  define("40", F2LCategory.PIECES_IN_SLOT, "R U R' F U R U' R' F' R U R'", {
    "F-CR": "R",
    "F-BR": "D",
    "S-CL": "F",
    "S-BL": "F",
  }),
  define("41", F2LCategory.PIECES_IN_SLOT, "R F U R U' R' F' U' R'", {
    "F-CR": "R",
    "F-BR": "R",
    "S-CL": "F",
    "S-BL": "D",
  }),
];

export const byId = Object.fromEntries(
  definitions.map((item) => [item.id, item]),
) as Record<F2LCaseId, F2LDefinition>;

export const { labels, options } = enumToOptions(F2LCategory, {
  [F2LCategory.CONNECTED_PAIRS]: "已連接的對組",
  [F2LCategory.CORNER_IN_SLOT]: "角塊已在正確位置",
  [F2LCategory.DISCONNECTED_PAIRS]: "尚未連接的對組",
  [F2LCategory.EDGE_IN_SLOT]: "邊塊已在正確位置",
  [F2LCategory.FREE_PAIRS]: "可自由移動的對組",
  [F2LCategory.PIECES_IN_SLOT]: "對組在插槽中",
});
