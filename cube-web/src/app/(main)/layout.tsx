import React from "react";

import BasicLayout from "@/components/layout/Basic";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <BasicLayout>
      <main className="pt-6 pb-24">{children}</main>
    </BasicLayout>
  );
}
