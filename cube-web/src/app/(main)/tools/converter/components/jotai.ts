import { atom } from "jotai";

/** 是否原地複寫 */
export const inPlaceAtom = atom(false);

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
