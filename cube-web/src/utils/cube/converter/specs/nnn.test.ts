import { createNxNNotationSpec } from "./nnn";

describe("NxN CubeNotationSpec", () => {
  const N = 4; // 測試 4x4
  const spec = createNxNNotationSpec(N);

  test("valid wide moves with prefix", () => {
    const moves = ["Rw", "2Rw", "3Uw'", "Fw2"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(true));
  });

  test("invalid wide moves with illegal prefix", () => {
    const moves = ["1Rw", "4Uw", "5Fw"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(false));
  });

  test("regular face moves", () => {
    const moves = ["R", "U'", "F2"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(true));
  });

  test("parseMove returns correct MoveToken", () => {
    const token = spec.parseMove("2Uw'");
    expect(token).not.toBeNull();
    if (token) {
      expect(token.base).toBe("Uw");
      expect(token.suffix).toBe("'");
      expect(token.prefix).toBe(2);
    }
  });

  test("parseMove returns null on invalid move", () => {
    const token = spec.parseMove("1Rw");
    expect(token).toBeNull();
  });
});
