# 說明文件

## 流程關係總覽

### 單一步驟字串 → MoveToken

- `parseMove(moveStr)`
  - 使用 `REGEX` 建立 MoveToken
  - 經過 `_normalizeAndParse()`
    - `_normalizeToken()`
    - `parser.parseMove()`

### MoveToken → 標準字串

- `formatMoveToken(token)`
  - `_normalizeAndParse(token)`
  - `toMoveTokenString()`

### 字串 → 標準字串

- `formatMove(moveStr)`
  - `parseMove(moveStr)`
  - `formatMoveToken(token)`

### 整串演算法字串 → MoveToken[]

- `parseAlgorithm(algStr)`
  - `split()` by space
  - 每個片段走 `parseMove()`
  - 全部合法才回傳陣列

### MoveToken[] / string[] → 演算法字串

- `stringifyAlgorithm(alg)`
  - `map()`：
    - string → `formatMove()`
    - token → `formatMoveToken()`
  - 全部合法才 `join(" ")`

### 驗證合法性

- `isValidMoveString(moveStr)`
  - `parseMove(moveStr) !== null`
- `isValidMoveToken(token)`
  - `_normalizeAndParse(token) !== null`

### 轉換工具：鏡像 / 反轉 / 旋轉

- `mirrorAlgorithm / reverseAlgorithm / rotateAlgorithm`
  - 經過 `withParserTransform()`
    - 共用基礎轉換 `baseFn`
    - 可選 `parser.xxxAlgorithm()` 擴充

---

## 設計原則

1. 所有流程最終都會經過 `parser`，確保擴充邏輯能被應用
2. 若 `parser` 無特別實作，則回傳原始 token，保持冪等
3. `formatMove` 與 `formatMoveToken` 結果一致，差別只在輸入型別
4. `stringifyAlgorithm` 能同時處理字串陣列與 MoveToken 陣列

---

## 簡易流程圖

```text
  (字串)
     │
     ▼
 parseMove ───► MoveToken ───► formatMoveToken ───► (標準字串)
     │                                         ▲
     └──────────────────► formatMove ──────────┘
```
