import React from "react";

type Props = {
  className?: string;
};

export const DesktopView: React.FC<Props> = ({ className = "", children }) => {
  // TODO: make it responsive
  return <div className={"p-4 text-white" + className}>{children}</div>;
};
