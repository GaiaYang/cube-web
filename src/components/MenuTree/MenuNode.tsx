import type { MenuOption } from "@/types/menu";
import type { MenuIconProps } from "./types";

import MenuLink from "./MenuLink";
import MenuDetails from "./MenuDetails";

export interface MenuNodeProps extends MenuOption {
  renderIcon?: (pramas: MenuIconProps) => React.ReactNode;
}

const iconProps: Omit<MenuIconProps, keyof MenuOption> = {
  className: "size-5",
  size: 24,
};

export default function MenuNode({ renderIcon, ...item }: MenuNodeProps) {
  const { id, title, href, submenu, collapsible, asTitle, divider } = item;

  // 分隔線
  if (divider) return <li />;

  /** 渲染內容 */
  const _renderContent = (
    <>
      {renderIcon?.({ ...item, ...iconProps }) || null}
      {title}
    </>
  );

  if (asTitle) {
    if (submenu) {
      // menu-title + 子菜單
      return (
        <li>
          <h2 className="menu-title text-base-content/50">{_renderContent}</h2>
          <ul>{submenu.map(_renderNode)}</ul>
        </li>
      );
    } else {
      // menu-title（純文字）
      return (
        <li className="menu-title text-base-content/50">{_renderContent}</li>
      );
    }
  }

  // 可折疊父層
  if (collapsible && submenu) {
    return (
      <li>
        <MenuDetails id={id}>
          <summary>{_renderContent}</summary>
          <ul>{submenu.map(_renderNode)}</ul>
        </MenuDetails>
      </li>
    );
  }

  return (
    <li>
      {href ? (
        <MenuLink href={href}>{_renderContent}</MenuLink>
      ) : (
        <span>{_renderContent}</span>
      )}
      {submenu ? <ul>{submenu.map(_renderNode)}</ul> : null}
    </li>
  );
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}
