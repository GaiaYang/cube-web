import createMenuOptions from "@/utils/createMenuOptions";

export const options = createMenuOptions([
  {
    title: "教學",
    submenu: [
      { title: "總覽", href: "/tutorial" },
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
              },
              {
                title: "F2L",
                href: "/tutorial/333/cfop/f2l",
              },
              {
                title: "兩段式OLL",
                href: "/tutorial/333/cfop/oll/2look",
              },
              {
                title: "OLL",
                href: "/tutorial/333/cfop/oll",
              },
              {
                title: "兩段式PLL",
                href: "/tutorial/333/cfop/pll/2look",
              },
              {
                title: "PLL",
                href: "/tutorial/333/cfop/pll",
              },
            ],
          },
        ],
        asTitle: true,
      },
    ],
    collapsible: true,
  },
  {
    title: "公式表",
    submenu: [
      { title: "公式總覽", href: "/algs" },
      {
        title: "三階公式表",
        asTitle: true,
        submenu: [
          { title: "總覽", href: "/algs/333" },
          { title: "F2L", href: "/algs/333/f2l" },
          { title: "OLL", href: "/algs/333/oll" },
          { title: "PLL", href: "/algs/333/pll" },
        ],
      },
    ],
    collapsible: true,
  },
]);

export const drawerId = "drawer";
export const drawerMenuId = "drawer-menu";
