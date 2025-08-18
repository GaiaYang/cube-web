import { atom } from "jotai";
import { FormType } from "./types";

export const tabIndexAtom = atom(0);

/**
 * 表單形式
 * - stand: 獨立轉換
 * - in-place: 原地複寫
 *
 * @default "stand"
 * */
export const formTypeAtom = atom<FormType>("stand");

export const enabledAtom = atom({
  /** 鏡像 */
  mirrorForm: true,
  /** 反轉 */
  reverseForm: true,
  /** 旋轉 */
  rotateForm: true,
  /** 鏡像旋轉 */
  mirrorRotateForm: true,
  /** 轉大寫 */
  upperForm: true,
  /** 轉小寫 */
  lowerForm: true,
});
