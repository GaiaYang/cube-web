import {
  BookOpenIcon,
  SettingsIcon,
  TableOfContentsIcon,
  WrenchIcon,
} from "lucide-react";

import { drawerMenuId } from "./config";
import { drawerMenu } from "@/contents/menu";

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
  switch (item.id) {
    case "tutorial":
      return <BookOpenIcon className={item.className} />;
    case "algs":
      return <TableOfContentsIcon className={item.className} />;
    case "settings":
      return <SettingsIcon className={item.className} />;
    case "tools":
      return <WrenchIcon className={item.className} />;
    default:
      break;
  }
};
