"use client";

import { drawerSideId } from "./config";

import cn from "@/utils/cn";
import useScrolledClass from "./useScrolledClass";

export default function DrawerNavbar({ children }: React.PropsWithChildren) {
  const className = useScrolledClass(drawerSideId);

  return <div className={cn("navbar px-4", className)}>{children}</div>;
}
