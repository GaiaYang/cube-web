import type { MenuOption } from "./types";

export const options: MenuOption[] = [
  {
    label: "教學",
    submenu: [
      { title: "三階" },
      {
        label: "CFOP",
        submenu: [
          { label: "引導", href: "/tutorial/333/cfop" },
          { label: "十字", href: "/tutorial/333/cfop/cross" },
          { label: "前兩層", href: "/tutorial/333/cfop/f2l" },
          { label: "頂面方向", href: "/tutorial/333/cfop/oll" },
          { label: "頂層位置", href: "/tutorial/333/cfop/pll" },
        ],
      },
    ],
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
