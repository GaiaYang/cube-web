import type { CommonProps } from "./types";

import Navbar from "./Navbar";
import Header from "./Header";
import Drawer, { type DrawerProps } from "./Drawer";

export interface BasicLayoutProps extends CommonProps, DrawerProps {}

export default function BasicLayout({
  responsive = true,
  children,
}: React.PropsWithChildren<BasicLayoutProps>) {
  return (
    <Drawer responsive={responsive}>
      <Header>
        <Navbar responsive={responsive} />
      </Header>
      {children}
    </Drawer>
  );
}
