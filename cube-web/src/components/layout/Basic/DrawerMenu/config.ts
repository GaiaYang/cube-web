import type { MenuOption } from "./types";

export const options: MenuOption[] = [
  {
    label: "教學",
    submenu: [
      { label: "總覽", href: "/tutorial", key: "/tutorial" },
      { title: "三階教學", key: "tutorial/333title" },
      {
        label: "CFOP",
        submenu: [
          {
            label: "引導",
            href: "/tutorial/333/cfop",
            key: "/tutorial/333/cfop",
          },
          {
            label: "Cross",
            href: "/tutorial/333/cfop/cross",
            key: "/tutorial/333/cfop/cross",
          },
          {
            label: "F2L",
            href: "/tutorial/333/cfop/f2l",
            key: "/tutorial/333/cfop/f2l",
          },
          {
            label: "兩段式OLL",
            href: "/tutorial/333/cfop/oll/2look",
            key: "/tutorial/333/cfop/oll/2look",
          },
          {
            label: "OLL",
            href: "/tutorial/333/cfop/oll",
            key: "/tutorial/333/cfop/oll",
          },
          {
            label: "兩段式PLL",
            href: "/tutorial/333/cfop/pll/2look",
            key: "/tutorial/333/cfop/pll/2look",
          },
          {
            label: "PLL",
            href: "/tutorial/333/cfop/pll",
            key: "/tutorial/333/cfop/pll",
          },
        ],
        key: "tutorial/333/cfop",
      },
    ],
    key: "tutorial",
  },
  {
    label: "公式表",
    submenu: [
      { label: "公式總覽", href: "/algs", key: "/algs" },
      // 三階公式表
      { title: "三階公式表", key: "algs/333title" },
      { label: "總覽", href: "/algs/333", key: "/algs/333" },
      { label: "F2L", href: "/algs/333/f2l", key: "/algs/333/f2l" },
      { label: "OLL", href: "/algs/333/oll", key: "/algs/333/oll" },
      { label: "PLL", href: "/algs/333/pll", key: "/algs/333/pll" },
    ],
    key: "algs",
  },
];
