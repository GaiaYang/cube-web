import type { SVGProps } from "react";

export interface CommonDiagramProps extends SVGProps<SVGSVGElement> {
  /** 指定固定尺寸 */
  size?: number;
  /**
   * 控制 SVG 何時開始載入
   *
   * - `eager` 立即載入 SVG
   * - `lazy` 當 SVG 進入可見範圍時才載入
   *
   * @default "eager"
   */
  loading?: "eager" | "lazy";
  /**
   * 佔位符顯示
   *
   * - `empty` 不使用佔位符
   * - `skeleton` 使用骨架
   *
   * @default 'empty'
   */
  placeholder?: "empty" | "skeleton";
  /**
   * 離開 viewport 時是否卸載內容，僅在 `loading="lazy"` 時生效
   *
   * @default false
   */
  unmountOnExit?: boolean;
}
