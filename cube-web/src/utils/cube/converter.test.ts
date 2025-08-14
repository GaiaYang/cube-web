import { isValidMove, normalizeMove } from "./converter";

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
