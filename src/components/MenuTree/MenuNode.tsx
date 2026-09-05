import MenuDetails from "./MenuDetails";
import MenuLink from "./MenuLink";
import type { MenuIconProps, RenderMenuIcon } from "./types";

import {
  MenuItem,
  MenuTitle,
  MenuTitleHeading,
} from "@/components/daisy-ui/menu";
import type { MenuItem as MenuItemData } from "@/types/menu";

export interface MenuNodeProps {
  item: MenuItemData;
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
          <MenuTitleHeading className="text-base-content/60">
            {content}
          </MenuTitleHeading>
          <ul>{renderChildren(item.children, renderIcon)}</ul>
        </li>
      );
    }

    return (
      <MenuTitle className="text-base-content/60">{content}</MenuTitle>
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
    <MenuItem disabled={item.disabled}>
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
    </MenuItem>
  );
}

function renderChildren(
  items: readonly MenuItemData[],
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
