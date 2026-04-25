import Drawer, { type DrawerProps } from "./Drawer";
import Header from "./Header";
import Navbar from "./Navbar";
import type { CommonProps } from "./types";

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
