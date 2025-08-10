"use client";

import { atom, useAtomValue } from "jotai";
import React, { useMemo } from "react";

import { openIdsAtom } from "./jotai";

export interface MenuDetailsProps
  extends React.DetailsHTMLAttributes<HTMLDetailsElement> {}

export default function MenuDetails({ id, ...props }: MenuDetailsProps) {
  const isActive = useAtomValue(
    useMemo(
      () => atom((get) => (id ? get(openIdsAtom).includes(id) : false)),
      [id],
    ),
  );

  return <details {...props} open={isActive} />;
}
