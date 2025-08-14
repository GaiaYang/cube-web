import {
  isValidMove,
  normalizeMove,
  mirrorAlgorithm,
  mergeToAlgorithm,
} from "./converter";

test("isValidMove", () => {
  expect(isValidMove("U")).toEqual(true);
  expect(isValidMove("U2")).toEqual(true);
  expect(isValidMove("3Rw'2")).toEqual(true);
  expect(isValidMove("3Rw'4")).toEqual(true);
  expect(isValidMove("Q")).toEqual(false);
});

test("normalizeMove", () => {
  expect(normalizeMove("U10")).toEqual("U2");
  expect(normalizeMove("U-3")).toEqual(null);
  expect(normalizeMove("3Rw'15")).toEqual("3Rw");
});

test("mirrorAlgorithm", () => {
  expect(mergeToAlgorithm(mirrorAlgorithm("R U F L D B x y z E M S"))).toEqual(
    "L' U' F' R' D' B' x' y' z' E' M' S'",
  );
  expect(mergeToAlgorithm(mirrorAlgorithm("y2 L U F' U' L' U L F L'"))).toEqual(
    "y2 R' U' F U R U' R' F' R",
  );
  expect(mergeToAlgorithm(mirrorAlgorithm("R U B' U' R' U R B R'"))).toEqual(
    "L' U' B U L U' L' B' L",
  );
});
