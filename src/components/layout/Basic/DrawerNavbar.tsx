"use client";

import { cn } from "cn";

import { drawerSideId } from "./config";
import useScrolledClass from "./useScrolledClass";

import { Navbar } from "@/components/daisy-ui/navbar";

export default function DrawerNavbar({ children }: React.PropsWithChildren) {
  const scrolledClassName = useScrolledClass(drawerSideId);

  return <Navbar className={cn("px-4", scrolledClassName)}>{children}</Navbar>;
}
