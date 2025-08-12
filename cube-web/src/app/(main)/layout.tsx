import React from "react";

import BasicLayout from "@/components/layout/Basic";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <BasicLayout>
      <main className="py-6">{children}</main>
    </BasicLayout>
  );
}
