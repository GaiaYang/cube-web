import { threeByThreeNotationSpec } from "../specs/333";
import {
  mirrorHorizontalAlgorithm,
  reverseAlgorithm,
  yRotateAlgorithm,
} from "./index";

describe("Algorithm Operations (3x3)", () => {
  const spec = threeByThreeNotationSpec;

  describe("mirrorHorizontalAlgorithm", () => {
    test("鏡像 R <-> L, 其他不變", () => {
      const formula = "R U L' D2 Rw Uw";
      const mirrored = mirrorHorizontalAlgorithm(formula, spec);
      expect(mirrored).toBe("L U R' D2 Lw Uw");
    });

    test("非法公式回傳 null", () => {
      const formula = "R X U";
      const mirrored = mirrorHorizontalAlgorithm(formula, spec);
      expect(mirrored).toBeNull();
    });
  });

  describe("reverseAlgorithm", () => {
    test("公式反轉並反向單步驟", () => {
      const formula = "R2 L U'";
      const reversed = reverseAlgorithm(formula, spec);
      expect(reversed).toBe("U L' R2");
    });

    test("非法公式回傳 null", () => {
      const formula = "R Y L";
      const reversed = reverseAlgorithm(formula, spec);
      expect(reversed).toBeNull();
    });
  });

  describe("yRotateAlgorithm", () => {
    test("前後旋轉對應 F<->B, R<->L", () => {
      const formula = "R U F' B2 Lw Uw";
      const rotated = yRotateAlgorithm(formula, spec);
      expect(rotated).toBe("L U B' F2 Rw Uw");
    });

    test("非法公式回傳 null", () => {
      const formula = "R Q L";
      const rotated = yRotateAlgorithm(formula, spec);
      expect(rotated).toBeNull();
    });
  });
});
