import type { MenuOption } from "./types";

export const options: MenuOption[] = [
  {
    label: "教學",
    submenu: [
      { label: "總覽", href: "/tutorial" },
      { title: "三階" },
      {
        label: "CFOP",
        submenu: [
          { label: "引導", href: "/tutorial/333/cfop" },
          { label: "Cross", href: "/tutorial/333/cfop/cross" },
          { label: "F2L", href: "/tutorial/333/cfop/f2l" },
          { label: "兩段式OLL", href: "/tutorial/333/cfop/oll/2look" },
          { label: "OLL", href: "/tutorial/333/cfop/oll" },
          { label: "兩段式PLL", href: "/tutorial/333/cfop/pll/2look" },
          { label: "PLL", href: "/tutorial/333/cfop/pll" },
        ],
        defaultOpen: true,
      },
    ],
    defaultOpen: true,
  },
  {
    label: "公式表",
    submenu: [
      { label: "公式總覽", href: "/algs" },
      // 三階公式表
      { title: "三階" },
      { label: "總覽", href: "/algs/333" },
      { label: "F2L", href: "/algs/333/f2l" },
      { label: "OLL", href: "/algs/333/oll" },
      { label: "PLL", href: "/algs/333/pll" },
    ],
  },
];
