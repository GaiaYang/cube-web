import React, { useId } from "react";

export interface DrawerProps {
  id?: string;
  renderSide?: React.ReactNode | (() => React.ReactNode);
  renderButton?:
    | React.ReactNode
    | ((callBack: {
        labelProps: Pick<HTMLLabelElement, "htmlFor" | "className">;
      }) => React.ReactNode);
}

export default function Drawer({
  id,
  renderSide,
  renderButton,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  const _id = useId();
  const drawerId = id || _id;

  return (
    <div className="drawer drawer-end flex-1">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {children}
        {typeof renderButton === "function"
          ? renderButton({
              labelProps: { htmlFor: drawerId, className: "drawer-button" },
            })
          : renderButton}
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        {typeof renderSide === "function" ? renderSide() : renderSide}
      </div>
    </div>
  );
}
