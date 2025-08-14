import {
  isValidMoveString,
  standardizeMove,
  mirrorAlgorithm,
  mergeToAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
} from "./converter";

test("isValidMoveString", () => {
  expect(isValidMoveString("U")).toEqual(true);
  expect(isValidMoveString("U2")).toEqual(true);
  expect(isValidMoveString("3Rw2'")).toEqual(true);
  expect(isValidMoveString("3Rw4'")).toEqual(true);
  expect(isValidMoveString("Q")).toEqual(false);
});

test("standardizeMove", () => {
  expect(standardizeMove("U10")).toEqual("U2");
  expect(standardizeMove("U-3")).toEqual(null);
  expect(standardizeMove("3Rw15'")).toEqual("3Rw");
});

test("mirrorAlgorithm", () => {
  expect(mergeToAlgorithm(mirrorAlgorithm("R U F L D B x y z E M S"))).toEqual(
    "L' U' F' R' D' B' x' y' z' E' M' S'",
  );
  expect(mergeToAlgorithm(mirrorAlgorithm("y2 L U F' U' L' U L F L'"))).toEqual(
    "y2' R' U' F U R U' R' F' R",
  );
  expect(mergeToAlgorithm(mirrorAlgorithm("R U B' U' R' U R B R'"))).toEqual(
    "L' U' B U L U' L' B' L",
  );
});

test("reverseAlgorithm", () => {
  expect(mergeToAlgorithm(reverseAlgorithm("R U F L D B x y z E M S"))).toEqual(
    "S' M' E' z' y' x' B' D' L' F' U' R'",
  );
  expect(
    mergeToAlgorithm(reverseAlgorithm("R' U' F' L' D' B' x' y' z' E' M' S'")),
  ).toEqual("S M E z y x B D L F U R");
});

test("rotateAlgorithm", () => {
  expect(
    mergeToAlgorithm(rotateAlgorithm("R' U' F' L' D' B' x' y' z' E' M' S'")),
  ).toEqual("L' U' B' R' D' F' x' y' z' E' M' S'");
  expect(mergeToAlgorithm(rotateAlgorithm("R U F L D B x y z E M S"))).toEqual(
    "L U B R D F x y z E M S",
  );
  expect(mergeToAlgorithm(rotateAlgorithm("L U B R D F x y z E M S"))).toEqual(
    "R U F L D B x y z E M S",
  );
  expect(
    mergeToAlgorithm(rotateAlgorithm("L' U' B' R' D' F' x' y' z' E' M' S'")),
  ).toEqual("R' U' F' L' D' B' x' y' z' E' M' S'");
});

test("upperAlgorithm", () => {
  expect(
    mergeToAlgorithm(upperAlgorithm(["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"])),
  ).toEqual("Rw Lw Uw Dw Fw Bw");
  expect(
    mergeToAlgorithm(
      upperAlgorithm(["2Rw'", "Lw2'", "Uw2", "Dw'", "Fw", "Bw"]),
    ),
  ).toEqual("2Rw' Lw2' Uw2 Dw' Fw Bw");
  expect(
    mergeToAlgorithm(upperAlgorithm(["r", "l", "u", "d", "f", "b"])),
  ).toEqual("Rw Lw Uw Dw Fw Bw");
  expect(
    mergeToAlgorithm(upperAlgorithm(["2r'", "l2'", "u2", "d'", "f", "b"])),
  ).toEqual("2Rw' Lw2' Uw2 Dw' Fw Bw");
});

test("lowerAlgorithm", () => {
  expect(
    mergeToAlgorithm(lowerAlgorithm(["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"])),
  ).toEqual("r l u d f b");
  expect(
    mergeToAlgorithm(
      lowerAlgorithm(["2Rw'", "Lw2'", "Uw2", "Dw'", "Fw", "Bw"]),
    ),
  ).toEqual("2r' l2' u2 d' f b");
  expect(
    mergeToAlgorithm(lowerAlgorithm(["r", "l", "u", "d", "f", "b"])),
  ).toEqual("r l u d f b");
  expect(
    mergeToAlgorithm(lowerAlgorithm(["2r'", "l2'", "u2", "d'", "f", "b"])),
  ).toEqual("2r' l2' u2 d' f b");
});
