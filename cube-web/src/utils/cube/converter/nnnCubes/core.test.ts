import { isValidOuterMove } from "./core";

describe("正階方塊核心函式檢查", () => {
  test("檢查轉動層數是否合法", () => {
    const layers = [1, 2, 3, 4, 5, 6, 7];

    // 第一部分測試：只傳入 layer (N)，n 預設為 2
    for (const layer of layers) {
      // 當 n = 2 時，需滿足 1 < 2 < N，即 N > 2
      expect(isValidOuterMove(layer)).toBe(layer > 2);
    }

    // 第二部分測試：傳入 layer (N) 和 m (n)
    for (let i = 0; i < layers.length; i++) {
      for (let m = 0; m < layers.length; m++) {
        // 需滿足 1 < n < N
        expect(isValidOuterMove(layers[i], layers[m])).toBe(
          layers[m] > 1 && layers[m] < layers[i],
        );
      }
    }
  });
});
