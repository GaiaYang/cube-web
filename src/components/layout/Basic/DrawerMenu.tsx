import { createElement } from "react";
import {
  BookOpenIcon,
  SettingsIcon,
  TableOfContentsIcon,
  WrenchIcon,
} from "lucide-react";

import { drawerMenuId } from "./config";
import { drawerMenu } from "@/data/menu";

import MenuTree, { type MenuTreeProps } from "@/components/MenuTree";

export default function DrawerMenu() {
  return (
    <MenuTree
      id={drawerMenuId}
      options={drawerMenu}
      className="px-4 py-0"
      renderIcon={renderIcon}
    />
  );
}

const renderIcon: MenuTreeProps["renderIcon"] = (item) => {
  let _tag;

  switch (item.id) {
    case "tutorial":
      _tag = BookOpenIcon;
      break;
    case "algs":
      _tag = TableOfContentsIcon;
      break;
    case "settings":
      _tag = SettingsIcon;
      break;
    case "tools":
      _tag = WrenchIcon;
      break;
    default:
      return null;
  }

  return createElement(_tag, { className: item.className });
};
