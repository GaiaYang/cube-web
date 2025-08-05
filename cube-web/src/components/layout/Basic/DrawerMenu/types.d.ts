export interface MenuOption {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  submenu?: MenuOption[];
}
