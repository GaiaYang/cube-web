import {
  parseFormula,
  stringifyFormula,
  isValidMove,
  isValidFormula,
} from "./core";
import { threeByThreeNotationSpec } from "./specs/333";

describe("core functions", () => {
  const spec = threeByThreeNotationSpec;

  test("tokenize + parseFormula returns correct tokens", () => {
    const formula = "R U R' U'";
    const tokens = parseFormula(formula, spec);

    expect(tokens).not.toBeNull();
    if (tokens) {
      expect(tokens.map((t) => t.raw).join(" ")).toBe(formula);
      expect(tokens[0].base).toBe("R");
      expect(tokens[2].suffix).toBe("'");
    }
  });

  test("parseFormula returns null on invalid move", () => {
    const formula = "R X U";
    const tokens = parseFormula(formula, spec);
    expect(tokens).toBeNull();
  });

  test("stringifyFormula returns same formula", () => {
    const formula = "R U R' U'";
    const tokens = parseFormula(formula, spec);
    expect(tokens).not.toBeNull();
    if (tokens) {
      const str = stringifyFormula(tokens);
      expect(str).toBe(formula);
    }
  });

  test("isValidMove correctly identifies moves", () => {
    expect(isValidMove("R", spec)).toBe(true);
    expect(isValidMove("R2", spec)).toBe(true);
    expect(isValidMove("X", spec)).toBe(false);
  });

  test("isValidFormula correctly validates formula", () => {
    expect(isValidFormula("R U R' U'", spec)).toBe(true);
    expect(isValidFormula("R X U", spec)).toBe(false);
  });
});
