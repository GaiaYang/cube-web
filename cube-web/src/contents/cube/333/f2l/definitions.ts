import type { F2LDefinition } from "@/types/cube/333";
import { F2LCategory } from "@/enums/cube/333";

export type { F2LDefinition, F2LCaseId } from "@/types/cube/333";

/** 固定上色 */
const fixedPattern: Pick<
  F2LDefinition["pattern"],
  "F-CC" | "F-CL" | "F-BL" | "F-BC" | "S-CC" | "S-CR" | "S-BC" | "S-BR"
> = {
  "F-CC": "F",
  "F-CL": "F",
  "F-BL": "F",
  "F-BC": "F",
  "S-CC": "R",
  "S-CR": "R",
  "S-BC": "R",
  "S-BR": "R",
};

export const definitions: F2LDefinition[] = [
  {
    id: "1",
    name: "F2L 1",
    setupAlgorithms: "F R' F' R",
    category: F2LCategory.FREE_PAIRS,
    pattern: {
      ...fixedPattern,
      "U-CR": "F",
      "U-BR": "F",
      "F-TR": "D",
      "S-TL": "R",
      "S-TC": "R",
    },
  },
  {
    id: "2",
    name: "F2L 2",
    setupAlgorithms: "R' F R F'",
    category: F2LCategory.FREE_PAIRS,
    pattern: {
      ...fixedPattern,
      "U-BC": "R",
      "U-BR": "R",
      "F-TC": "F",
      "F-TR": "F",
      "S-TL": "D",
    },
  },
  {
    id: "3",
    name: "F2L 3",
    setupAlgorithms: "F' U F",
    category: F2LCategory.FREE_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "4",
    name: "F2L 4",
    setupAlgorithms: "R U' R'",
    category: F2LCategory.FREE_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "5",
    name: "F2L 5",
    setupAlgorithms: "R U R' U2' R U' R' U",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "6",
    name: "F2L 6",
    setupAlgorithms: "F' U' F U2' F' U F U'",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "7",
    name: "F2L 7",
    setupAlgorithms: "R U R' U2' R U2' R' U",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "8",
    name: "F2L 8",
    setupAlgorithms: "r' U' R2 U' R2' U2' r",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "9",
    name: "F2L 9",
    setupAlgorithms: "F' U F U' R U R' U",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "10",
    name: "F2L 10",
    setupAlgorithms: "R U' R' U' R U' R' U",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "11",
    name: "F2L 11",
    setupAlgorithms: "F' U F U' R U2' R' U",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "12",
    name: "F2L 12",
    setupAlgorithms: "R U R' U2' R U R' U' R U R'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "13",
    name: "F2L 13",
    setupAlgorithms: "r U2' R' U R U' R' U M",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "14",
    name: "F2L 14",
    setupAlgorithms: "R U' R' U' R U R' U",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "15",
    name: "F2L 15",
    setupAlgorithms: "R U R' U' R U R' U2' R U' R'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "16",
    name: "F2L 16",
    setupAlgorithms: "F' U F U2' R U R'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "17",
    name: "F2L 17",
    setupAlgorithms: "R U' R' U R U2' R'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "18",
    name: "F2L 18",
    setupAlgorithms: "R U R' U' R U R' F R' F' R",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "19",
    name: "F2L 19",
    setupAlgorithms: "R U R' U' R U2' R' U'",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "20",
    name: "F2L 20",
    setupAlgorithms: "R U R' F R' F' R2' U R' U",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "21",
    name: "F2L 21",
    setupAlgorithms: "R U' R' U2' R U R'",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "22",
    name: "F2L 22",
    setupAlgorithms: "F' L' U2' L F",
    category: F2LCategory.DISCONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "23",
    name: "F2L 23",
    setupAlgorithms: "R U' R' U R U' R' U2' R U' R'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "24",
    name: "F2L 24",
    setupAlgorithms: "R U R' F R U R' U' F'",
    category: F2LCategory.CONNECTED_PAIRS,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "25",
    name: "F2L 25",
    setupAlgorithms: "F' R U R' U' R' F R",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "26",
    name: "F2L 26",
    setupAlgorithms: "F' U' F U R U R' U'",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "27",
    name: "F2L 27",
    setupAlgorithms: "R U R' U' R U R'",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "28",
    name: "F2L 28",
    setupAlgorithms: "R' F R F' U R U' R'",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "29",
    name: "F2L 29",
    setupAlgorithms: "F R' F' R F R' F' R",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "30",
    name: "F2L 30",
    setupAlgorithms: "R U' R' U R U' R'",
    category: F2LCategory.CORNER_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "31",
    name: "F2L 31",
    setupAlgorithms: "R U R' F R' F' R U",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "32",
    name: "F2L 32",
    setupAlgorithms: "R U' R' U R U' R' U R U' R'",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "33",
    name: "F2L 33",
    setupAlgorithms: "R U R' U2' R U R' U",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "34",
    name: "F2L 34",
    setupAlgorithms: "R U' R' U2' R U' R' U'",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "35",
    name: "F2L 35",
    setupAlgorithms: "F' U F U' R U' R' U",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "36",
    name: "F2L 36",
    setupAlgorithms: "R U' R' U2' F R' F' R U2'",
    category: F2LCategory.EDGE_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "37",
    name: "F2L 37",
    setupAlgorithms: "R U' R U2' F R2' F' U2' R2'",
    category: F2LCategory.PIECES_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "38",
    name: "F2L 38",
    setupAlgorithms: "R U' R' U R U2' R' U R U' R'",
    category: F2LCategory.PIECES_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "39",
    name: "F2L 39",
    setupAlgorithms: "R U' R' U' R U R' U2' R U' R'",
    category: F2LCategory.PIECES_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "40",
    name: "F2L 40",
    setupAlgorithms: "R U R' F U R U' R' F' R U R'",
    category: F2LCategory.PIECES_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
  {
    id: "41",
    name: "F2L 41",
    setupAlgorithms: "R F U R U' R' F' U' R'",
    category: F2LCategory.PIECES_IN_SLOT,
    pattern: {
      ...fixedPattern,
    },
  },
];

export const definitionMap = new Map(
  definitions.map((definition) => [definition.id, definition]),
);
