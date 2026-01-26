"use client";

import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";

import mergeRefs from "@/utils/mergeRefs";
import cn from "@/utils/cn";

export interface LazySvgOptions {
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

export interface LazySvgProps
  extends React.SVGProps<SVGSVGElement>, LazySvgOptions {
  /** 要動態渲染的元素 */
  renderElements?: () => React.ReactNode;
}

/** 提供惰性載入 SVG 容器 */
export default function LazySvg({
  loading = "eager",
  placeholder = "empty",
  unmountOnExit = false,
  renderElements,
  // 原始屬性
  ref,
  className,
  children,
  ...props
}: LazySvgProps) {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: loading === "lazy" && !unmountOnExit,
    skip: loading === "eager",
  });
  /** 是否顯示元素 */
  const shouldRender = loading === "eager" || inView;
  const mergedRef = useMemo(
    () => mergeRefs([ref, inViewRef]),
    [ref, inViewRef],
  );

  return (
    <svg
      {...props}
      ref={mergedRef}
      className={cn(
        { skeleton: !shouldRender && placeholder === "skeleton" },
        className,
      )}
    >
      {(shouldRender ? renderElements?.() : null) ?? children}
    </svg>
  );
}
