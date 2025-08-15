"use client";

import React, { memo, useCallback, useReducer } from "react";
import { produce } from "immer";

import cn from "@/utils/cn";

interface Rule {
  id: string;
  color: string;
  backgroundColor: string;
  outline: string;
  label: string;
  char: string;
  description: string;
}

const rules: Rule[] = [
  {
    id: "1",
    color: "text-red-500",
    backgroundColor: "bg-red-500",
    outline: "outline-red-500",
    label: "轉動層數",
    char: "3",
    description: "指定要同時轉動的方塊層數，若未填寫，預設為單層轉動。",
  },
  {
    id: "2",
    color: "text-green-500",
    backgroundColor: "bg-green-500",
    outline: "outline-green-500",
    label: "轉動符號",
    char: "Uw",
    description: "決定要轉動哪一個面或位置，必填，否則無法辨識轉動目標。",
  },
  {
    id: "3",
    color: "text-orange-500",
    backgroundColor: "bg-orange-500",
    outline: "outline-orange-500",
    label: "轉動次數",
    char: "2",
    description: "數字表示要轉動幾次 90°，若未填寫，預設為一次。",
  },
  {
    id: "4",
    color: "text-blue-500",
    backgroundColor: "bg-blue-500",
    outline: "outline-blue-500",
    label: "轉動方向",
    char: "'",
    description: "使用 ' 表示逆時針方向，若未標示則預設為順時針方向。",
  },
];

// 狀態與 Action
interface HoverState {
  hoverId: string;
  lockedId: string | null;
}

type HoverAction =
  | { type: "HOVER"; id: string }
  | { type: "LEAVE" }
  | { type: "TOGGLE_LOCK"; id: string };

const initialValue: HoverState = { hoverId: "", lockedId: null };

// reducer
const reducer = produce((draft: HoverState, action: HoverAction) => {
  switch (action.type) {
    case "HOVER":
      draft.hoverId = action.id;
      break;
    case "LEAVE":
      draft.hoverId = "";
      break;
    case "TOGGLE_LOCK":
      if (draft.lockedId === action.id) {
        // 點擊同顏色 → 解鎖
        draft.lockedId = null;
        draft.hoverId = "";
      } else {
        // 點擊不同顏色 → 改鎖定
        draft.lockedId = action.id;
        draft.hoverId = action.id;
      }
      break;
  }
});

/** 方塊代號結構教學 */
export default memo(function CubeMoveStructure() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  // 找出當前 hover 或鎖定的 rule
  const activeId = state.lockedId || state.hoverId;
  const isLocked = Boolean(state.lockedId);

  const createCommonProps = useCallback((id: string) => {
    return {
      onMouseEnter: () => {
        dispatch({ type: "HOVER", id });
      },
      onMouseLeave: () => {
        dispatch({ type: "LEAVE" });
      },
      onClick: () => {
        dispatch({ type: "TOGGLE_LOCK", id });
      },
    } as Pick<
      React.HTMLAttributes<HTMLSpanElement>,
      "onMouseEnter" | "onMouseLeave" | "onClick"
    >;
  }, []);

  return (
    <div className="grid gap-4">
      {/* 上方符號列 */}
      <div
        className={cn(
          "not-prose",
          "flex justify-center gap-2 font-mono",
          "text-6xl/tight md:text-7xl/tight lg:text-8xl/tight",
        )}
      >
        {rules.map(({ id, color, backgroundColor, outline, char }) => {
          const isActive = id === activeId;
          const isHover = id === state.hoverId;

          return (
            <span
              key={id}
              className={cn(
                "cursor-pointer select-none",
                "border-base-content/5 rounded border px-2",
                isActive || isHover ? [backgroundColor, "text-white"] : color,
                isActive && isLocked
                  ? ["outline-2 outline-offset-2", outline]
                  : null,
              )}
              {...createCommonProps(id)}
            >
              {char}
            </span>
          );
        })}
      </div>
      {/* 下方卡片 */}
      <dl className={cn("not-prose", "grid grid-cols-1 gap-2 md:grid-cols-2")}>
        {rules.map(
          ({ id, color, backgroundColor, outline, label, description }) => {
            const isActive = id === activeId;
            const isHover = id === state.hoverId;

            return (
              <div
                key={id}
                className={cn(
                  "cursor-pointer select-none",
                  "card card-sm bg-base-100 border-base-content/5 border",
                  isActive || isHover ? [backgroundColor, "text-white"] : null,
                  isActive && isLocked
                    ? ["outline-2 outline-offset-2", outline]
                    : null,
                )}
                {...createCommonProps(id)}
              >
                <div className="card-body">
                  <dt
                    className={cn("card-title", {
                      [color]: !(isActive || isHover),
                    })}
                  >
                    {label}
                  </dt>
                  <dd className="text-sm">{description}</dd>
                </div>
              </div>
            );
          },
        )}
      </dl>
      {/* 底部文字說明 */}
      <p>
        上述案例的意思是轉動{" "}
        {rules.map(({ id, color, backgroundColor, outline, char }, index) => {
          const isActive = id === activeId;
          const isHover = id === state.hoverId;

          let suffix = "";
          switch (index) {
            case 0:
              suffix = char + "層";
              break;
            case 1:
              suffix = char + "面";
              break;
            case 2:
              suffix = char + "次";
              break;
            case 3:
              suffix = char === "'" ? "逆時針" : "順時針";
              break;
          }
          return (
            <span
              key={id}
              className={cn(
                "mx-1 cursor-pointer select-none",
                "badge font-mono",
                isActive || isHover ? [backgroundColor, "text-white"] : color,
                isActive && isLocked
                  ? ["outline outline-offset-1", outline]
                  : null,
              )}
              {...createCommonProps(id)}
            >
              {suffix}
            </span>
          );
        })}
      </p>
      <blockquote>
        提示：
        <br />
        把滑鼠移到想看的顏色上，就會高亮顯示。
        <br />
        如果想固定顏色，點一下就能鎖定；要換顏色就點別的，要解除就再點一次同一個顏色。
      </blockquote>
    </div>
  );
});
