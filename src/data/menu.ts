import type { MenuItem } from "@/types/menu";

/** 抽屜菜單(側邊欄) */
export const drawerMenu = [
  {
    type: "collapse",
    id: "tutorial",
    title: "教學",
    children: [
      {
        type: "link",
        title: "轉動代號說明",
        href: "/tutorial/notation",
      },
      {
        type: "title",
        title: "三階教學",
        children: [
          {
            type: "link",
            title: "總覽",
            href: "/tutorial/333",
          },
          {
            type: "link",
            title: "CFOP",
            href: "/tutorial/333/cfop",
            children: [
              {
                type: "link",
                title: "Cross",
                href: "/tutorial/333/cfop/cross",
              },
              {
                type: "link",
                title: "F2L",
                href: "/tutorial/333/cfop/f2l",
              },
              {
                type: "link",
                title: "OLL",
                href: "/tutorial/333/cfop/oll",
                children: [
                  {
                    type: "link",
                    title: "兩段式OLL",
                    href: "/tutorial/333/cfop/oll/2look",
                  },
                ],
              },
              {
                type: "link",
                title: "PLL",
                href: "/tutorial/333/cfop/pll",
                children: [
                  {
                    type: "link",
                    title: "兩段式PLL",
                    href: "/tutorial/333/cfop/pll/2look",
                  },
                ],
              },
            ],
          },
          {
            type: "link",
            title: "ZZ",
            href: "/tutorial/333/zz",
            children: [
              {
                type: "link",
                title: "EO Line",
                href: "/tutorial/333/zz/eo-line",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    id: "algs",
    title: "公式表",
    children: [
      {
        type: "title",
        title: "三階公式表",
        children: [
          { type: "link", title: "總覽", href: "/algs/333" },
          { type: "link", title: "F2L", href: "/algs/333/f2l" },
          { type: "link", title: "OLL", href: "/algs/333/oll" },
          { type: "link", title: "PLL", href: "/algs/333/pll" },
          {
            type: "title",
            title: "進階公式子集",
            children: [
              {
                type: "link",
                title: "ZBLL",
                href: "/algs/333/zbll",
              },
              {
                type: "link",
                title: "ZBLS",
                href: "/algs/333/zbls",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    id: "tools",
    title: "工具",
    children: [
      { type: "link", title: "公式轉換", href: "/tools/converter" },
    ],
  },
  { type: "divider" },
  { type: "link", id: "settings", title: "網站設定", href: "/settings" },
] satisfies readonly MenuItem[];
