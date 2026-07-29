import MenuDetails from "./MenuDetails";
import MenuLink from "./MenuLink";
import type { MenuIconProps, RenderMenuIcon } from "./types";

import type { MenuItem } from "@/types/menu";
import cn from "@/utils/cn";

export interface MenuNodeProps {
  item: MenuItem;
  renderIcon?: RenderMenuIcon;
}

const iconProps: MenuIconProps = {
  className: "size-5",
  size: 24,
};

export default function MenuNode({ item, renderIcon }: MenuNodeProps) {
  if (item.type === "divider") return <li />;

  const content = (
    <>
      {renderIcon?.(item, iconProps)}
      {item.title}
    </>
  );

  if (item.type === "title") {
    if (item.children) {
      return (
        <li>
          <h2 className="menu-title text-base-content/60">{content}</h2>
          <ul>{renderChildren(item.children, renderIcon)}</ul>
        </li>
      );
    }

    return (
      <li className="menu-title text-base-content/60">{content}</li>
    );
  }

  if (item.type === "collapse") {
    return (
      <li>
        <MenuDetails id={item.id}>
          <summary>{content}</summary>
          <ul>{renderChildren(item.children, renderIcon)}</ul>
        </MenuDetails>
      </li>
    );
  }

  return (
    <li className={cn({ "menu-disabled": item.disabled })}>
      {item.disabled ? (
        <a role="link" aria-disabled="true">
          {content}
        </a>
      ) : (
        <MenuLink href={item.href}>{content}</MenuLink>
      )}
      {item.children ? (
        <ul>{renderChildren(item.children, renderIcon)}</ul>
      ) : null}
    </li>
  );
}

function renderChildren(
  items: readonly MenuItem[],
  renderIcon?: RenderMenuIcon,
) {
  return items.map((item, index) => (
    <MenuNode
      item={item}
      key={
        item.id ??
        ("href" in item ? item.href : undefined) ??
        `${item.type}-${index}`
      }
      renderIcon={renderIcon}
    />
  ));
}
