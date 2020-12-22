import React from "react";

export type Breadcrumb = {
  label: string;
  to: string;
};

type Props = {
  className?: string;
  breadcrumbs?: Breadcrumb[];
};

export const DesktopView: React.FC<Props> = ({
  className = "",
  breadcrumbs,
  children,
}) => {
  // TODO: make it responsive
  return <div className={"p-4 text-white" + className}>{children}</div>;
};
