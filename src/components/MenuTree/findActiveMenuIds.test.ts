import findActiveMenuIds from "./findActiveMenuIds";

import type { MenuItem } from "@/types/menu";

const items = [
  {
    type: "collapse",
    id: "docs",
    title: "Docs",
    children: [
      {
        type: "title",
        title: "Guide",
        children: [
          {
            type: "link",
            title: "Overview",
            href: "/docs",
          },
          {
            type: "link",
            title: "Getting started",
            href: "/docs/getting-started",
          },
        ],
      },
    ],
  },
] satisfies readonly MenuItem[];

describe("findActiveMenuIds", () => {
  it.each(["/docs", "/docs/getting-started"])(
    "opens every collapse containing %s",
    (pathname) => {
      expect(findActiveMenuIds(items, pathname)).toEqual(["docs"]);
    },
  );

  it("keeps the collapse open on a descendant route", () => {
    expect(
      findActiveMenuIds(items, "/docs/getting-started/first-step"),
    ).toEqual(["docs"]);
  });

  it("returns no collapses when the pathname is not in the menu", () => {
    expect(findActiveMenuIds(items, "/missing")).toEqual([]);
  });
});
