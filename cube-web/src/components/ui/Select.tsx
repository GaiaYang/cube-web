import React from "react";

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export default function Select({ value, children, ...props }: SelectProps) {
  return <select value={""} className="select focus:select-primary"></select>;
}
