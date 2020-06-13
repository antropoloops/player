import React, { ReactNode } from "react";
import useAnalytics from "../../hooks/useAnalytics";
import { useDeviceType } from "../../hooks/useDeviceType";
import Header from "./Header";

type Props = {
  title?: string;
  backTo?: string;
  header?: ReactNode;
  visuals?: ReactNode;
  desktop?: ReactNode;
};

const Layout: React.FC<Props> = ({
  title,
  backTo,
  header,
  children,
  visuals,
  desktop,
}) => {
  useAnalytics();
  const { isDesktop } = useDeviceType();

  header = header || <Header title={title} backTo={backTo} />;

  return (
    <div className="App">
      <div className="Header">{header}</div>
      <div className="Content">{children}</div>
      {visuals ? (
        <div className="visuals">{visuals}</div>
      ) : desktop && isDesktop ? (
        <div className="visuals overflow-y-scroll">{desktop}</div>
      ) : null}
    </div>
  );
};

export default Layout;
