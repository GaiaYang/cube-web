import { threeByThreeNotationSpec } from "./333";

describe("threeByThreeNotationSpec", () => {
  const spec = threeByThreeNotationSpec;

  test("valid base moves", () => {
    const moves = ["R", "L", "U", "D", "F", "B"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(true));
  });

  test("valid wide moves with prefix", () => {
    const moves = ["Rw", "2Rw", "Lw'", "Uw2"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(true));
  });

  test("invalid moves", () => {
    const moves = ["X", "R3", "Z'", "A2"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(false));
  });

  test("parseMove returns correct MoveToken", () => {
    const token = spec.parseMove("2Rw'");
    expect(token).not.toBeNull();
    if (token) {
      expect(token.base).toBe("Rw");
      expect(token.suffix).toBe("'");
      expect(token.prefix).toBe(2);
    }
  });

  test("parseMove returns null on invalid move", () => {
    const token = spec.parseMove("X");
    expect(token).toBeNull();
  });
});
