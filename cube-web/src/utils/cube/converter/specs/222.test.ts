import { twoByTwoNotationSpec } from "./222";

describe("twoByTwoNotationSpec", () => {
  const spec = twoByTwoNotationSpec;

  test("valid moves", () => {
    const moves = ["R", "U'", "F2", "x", "y'", "z2"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(true));
  });

  test("invalid moves", () => {
    const moves = ["Rw", "2Rw", "M", "Lw2", "X"];
    moves.forEach((move) => expect(spec.isValidMove(move)).toBe(false));
  });

  test("parseMove returns correct MoveToken", () => {
    const token = spec.parseMove("U2");
    expect(token).not.toBeNull();
    if (token) {
      expect(token.base).toBe("U");
      expect(token.suffix).toBe("2");
      expect(token.prefix).toBeUndefined();
    }
  });

  test("parseMove returns null on invalid move", () => {
    const token = spec.parseMove("Rw");
    expect(token).toBeNull();
  });
});
