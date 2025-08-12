import React from "react";

import BasicLayout from "@/components/layout/Basic";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <BasicLayout>
      <main className="py-10">{children}</main>
    </BasicLayout>
  );
}
