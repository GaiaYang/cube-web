import { nanoid } from "nanoid";

import type { MenuOption } from "./types";

export const options: MenuOption[] = [
  {
    title: "教學",
    submenu: [
      { title: "總覽", href: "/tutorial", id: nanoid() },
      {
        title: "三階教學",
        submenu: [
          {
            title: "CFOP",
            href: "/tutorial/333/cfop",
            submenu: [
              {
                title: "Cross",
                href: "/tutorial/333/cfop/cross",
                id: nanoid(),
              },
              {
                title: "F2L",
                href: "/tutorial/333/cfop/f2l",
                id: nanoid(),
              },
              {
                title: "兩段式OLL",
                href: "/tutorial/333/cfop/oll/2look",
                id: nanoid(),
              },
              {
                title: "OLL",
                href: "/tutorial/333/cfop/oll",
                id: nanoid(),
              },
              {
                title: "兩段式PLL",
                href: "/tutorial/333/cfop/pll/2look",
                id: nanoid(),
              },
              {
                title: "PLL",
                href: "/tutorial/333/cfop/pll",
                id: nanoid(),
              },
            ],
            id: nanoid(),
          },
        ],
        id: nanoid(),
        asTitle: true,
      },
    ],
    id: nanoid(),
    collapsible: true,
  },
  {
    title: "公式表",
    submenu: [
      { title: "公式總覽", href: "/algs", id: nanoid() },
      {
        title: "三階公式表",
        asTitle: true,
        submenu: [
          { title: "總覽", href: "/algs/333", id: nanoid() },
          { title: "F2L", href: "/algs/333/f2l", id: nanoid() },
          { title: "OLL", href: "/algs/333/oll", id: nanoid() },
          { title: "PLL", href: "/algs/333/pll", id: nanoid() },
        ],
        id: nanoid(),
      },
    ],
    id: nanoid(),
    collapsible: true,
  },
];
