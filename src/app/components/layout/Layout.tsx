import React, { ReactNode } from "react";
import useAnalytics from "../../hooks/useAnalytics";
import { useDeviceType } from "../../hooks/useDeviceType";
import Header from "./Header";
import { useQuery } from "react-query";
import { listSections } from "../../api/sections";

type Props = {
  className?: string;
  logo?: boolean;
  title?: string;
  backTo?: string;
  header?: ReactNode;
  visuals?: ReactNode;
  desktop?: ReactNode;
};

const Layout: React.FC<Props> = ({
  className,
  logo,
  title,
  backTo,
  header,
  children,
  visuals,
  desktop,
}) => {
  useAnalytics();
  const { isDesktop } = useDeviceType();
  const { data: sections } = useQuery("sections", () => listSections());

  header = header || (
    <Header
      logo={logo}
      title={title}
      backTo={backTo}
      sections={sections || []}
    />
  );

  return (
    <div className={`App ${className || ""}`}>
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
