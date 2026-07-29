import type { MenuItem } from "@/types/menu";

export default function findActiveMenuIds(
  items: readonly MenuItem[],
  pathname: string,
): string[] {
  return findPath(items, pathname) ?? [];
}

function findPath(
  items: readonly MenuItem[],
  pathname: string,
): string[] | null {
  for (const item of items) {
    if ("children" in item && item.children) {
      const childPath = findPath(item.children, pathname);

      if (childPath) {
        return item.type === "collapse" ? [item.id, ...childPath] : childPath;
      }
    }

    if (
      item.type === "link" &&
      (item.href === pathname || pathname.startsWith(`${item.href}/`))
    ) {
      return [];
    }
  }

  return null;
}
