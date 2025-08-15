import {
  mergeToAlgorithm,
  normalizeMoveString,
  isValidMoveString,
  isAlgorithmValid,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
} from "./converter";

test("isValidMoveString", () => {
  expect(isValidMoveString("R")).toBe(true);
  expect(isValidMoveString("R'")).toBe(true);
  expect(isValidMoveString("R2")).toBe(true);
  expect(isValidMoveString("R'2")).toBe(false);
  expect(isValidMoveString("Rw")).toBe(true);
  expect(isValidMoveString("Rw'")).toBe(true);
  expect(isValidMoveString("Rw2")).toBe(true);
  expect(isValidMoveString("2Rw2")).toBe(true);
  expect(isValidMoveString("2Rw2'")).toBe(true);
  expect(isValidMoveString("2Rw'2")).toBe(false);
  expect(isValidMoveString("Rw'2")).toBe(false);
  expect(isValidMoveString("2Rw'2")).toBe(false);
});

test("normalizeMoveString", () => {
  expect(normalizeMoveString("R")).toBe("R");
  expect(normalizeMoveString("R'")).toBe("R'");
  expect(normalizeMoveString("R2")).toBe("R2");
  expect(normalizeMoveString("R'2")).toBe(null);
  expect(normalizeMoveString("Rw")).toBe("Rw");
  expect(normalizeMoveString("Rw'")).toBe("Rw'");
  expect(normalizeMoveString("Rw2")).toBe("Rw2");
  expect(normalizeMoveString("2Rw2")).toBe("2Rw2");
  expect(normalizeMoveString("2Rw2'")).toBe("2Rw2'");
  expect(normalizeMoveString("2Rw'2")).toBe(null);
  expect(normalizeMoveString("Rw'2")).toBe(null);
  expect(normalizeMoveString("2Rw'2")).toBe(null);
});

test("mirrorAlgorithm", () => {
  expect(
    mergeToAlgorithm(mirrorAlgorithm("R U2 R2 F R F' U2 R' F R F'")),
  ).toEqual("L' U2 L2 F' L' F U2 L F' L' F");
  expect(mergeToAlgorithm(mirrorAlgorithm("S R U R' U' R' F R Fw'"))).toEqual(
    "S' L' U' L U L F' L' Fw",
  );
});

test("reverseAlgorithm", () => {
  expect(
    mergeToAlgorithm(reverseAlgorithm("R U2 R2 F R F' U2 R' F R F'")),
  ).toEqual("F R' F' R U2 F R' F' R2 U2 R'");
  expect(mergeToAlgorithm(reverseAlgorithm("S R U R' U' R' F R Fw'"))).toEqual(
    "Fw R' F' R U R U' R' S'",
  );
});

test("rotateAlgorithm", () => {
  expect(
    mergeToAlgorithm(rotateAlgorithm("R U2 R2 F R F' U2 R' F R F'")),
  ).toEqual("L U2 L2 B L B' U2 L' B L B'");
  expect(mergeToAlgorithm(rotateAlgorithm("S R U R' U' R' F R Fw'"))).toEqual(
    "S L U L' U' L' B L Bw'",
  );
});

test("upperAlgorithm", () => {
  expect(mergeToAlgorithm(upperAlgorithm("Rw Lw Uw Dw Fw Bw"))).toEqual(
    "Rw Lw Uw Dw Fw Bw",
  );
  expect(mergeToAlgorithm(upperAlgorithm("Rw l Uw d Fw b"))).toEqual(
    "Rw Lw Uw Dw Fw Bw",
  );
  expect(mergeToAlgorithm(upperAlgorithm("r Lw u Dw f b"))).toEqual(
    "Rw Lw Uw Dw Fw Bw",
  );
  expect(mergeToAlgorithm(upperAlgorithm("r l u d f b"))).toEqual(
    "Rw Lw Uw Dw Fw Bw",
  );
});

test("lowerAlgorithm", () => {
  expect(mergeToAlgorithm(lowerAlgorithm("Rw Lw Uw Dw Fw Bw"))).toEqual(
    "r l u d f b",
  );
  expect(mergeToAlgorithm(lowerAlgorithm("Rw l Uw d Fw b"))).toEqual(
    "r l u d f b",
  );
  expect(mergeToAlgorithm(lowerAlgorithm("r Lw u Dw f Bw"))).toEqual(
    "r l u d f b",
  );
  expect(mergeToAlgorithm(lowerAlgorithm("r l u d f b"))).toEqual(
    "r l u d f b",
  );
});

test("isAlgorithmValid", () => {
  expect(isAlgorithmValid("R U2 R2 F R F' U2 R' F R F'")).toBe(true);
  expect(isAlgorithmValid("R U2 R2 F R F' U2 R' F R F'2")).toBe(false);
  expect(isAlgorithmValid("A B C D")).toBe(false);
  expect(isAlgorithmValid("A'")).toBe(false);
  expect(isAlgorithmValid("rw")).toBe(false);
});
