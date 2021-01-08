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
  return <div className={"py-4 px-20 text-white" + className}>{children}</div>;
};
