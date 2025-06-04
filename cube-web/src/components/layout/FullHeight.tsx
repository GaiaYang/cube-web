import React from "react";

export default function FullHeightLayout({
  children,
}: React.PropsWithChildren) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}
