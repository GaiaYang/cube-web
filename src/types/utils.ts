/**
 * 產生 `"1" | "2" | ... | "${Count}"` 的字串數字聯集。
 *
 * @example
 * type Digits = StringIntRange<3>; // "1" | "2" | "3"
 */
export type StringIntRange<
  Count extends number,
  Acc extends string[] = [],
> = Acc["length"] extends Count
  ? Acc[number]
  : StringIntRange<Count, [...Acc, `${[1, ...Acc]["length"]}`]>;
