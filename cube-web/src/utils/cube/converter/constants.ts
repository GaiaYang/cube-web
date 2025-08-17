/**
 * --- 官方標準代號統一管理 ---
 * 此檔案統一管理各方塊的官方標準符號，供不同 CubeNotationSpec 使用
 * 將面轉動、旋轉、wide move、slice move 等統一定義，避免重複宣告
 */

/**
 * 基礎面轉動符號（Face Moves）
 * R: 右面、L: 左面、U: 上面、D: 底面、F: 前面、B: 後面
 */
export const faceMoves = ["R", "L", "U", "D", "F", "B"] as const;
/** FaceMove 型別聯合，可取值 "R" | "L" | "U" | "D" | "F" | "B" */
export type FaceMove = (typeof faceMoves)[number];

/**
 * 整體旋轉符號（Rotations）
 * x, y, z 分別代表繞 R/L、U/D、F/B 軸的旋轉
 */
export const rotations = ["x", "y", "z"] as const;
/** Rotation 型別聯合，可取值 "x" | "y" | "z" */
export type Rotation = (typeof rotations)[number];

/**
 * Wide Moves（多層面轉動符號）
 * Rw, Lw, Uw, Dw, Fw, Bw 表示包含外層及相鄰內層的旋轉
 */
export const wideMoves = ["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"] as const;
/** WideMove 型別聯合，可取值 "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw" */
export type WideMove = (typeof wideMoves)[number];

/**
 * Slice Moves（中層轉動符號，僅 3x3 特有）
 * M: 中間縱向、E: 中間橫向、S: 中間前後層
 */
export const sliceMoves = ["M", "E", "S"] as const;
/** SliceMove 型別聯合，可取值 "M" | "E" | "S" */
export type SliceMove = (typeof sliceMoves)[number];
