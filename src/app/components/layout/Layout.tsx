import React, { ReactNode } from "react";
import useAnalytics from "../../hooks/useAnalytics";
import { useDeviceType } from "../../hooks/useDeviceType";
import Header from "./Header";
import { useQuery } from "react-query";
import { listSections } from "../../api/sections";
import NavLink from "./NavLink";
import useLocale from "../../hooks/useLocale";
import { useLocation, Link } from "react-router-dom";

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
  const { pathname } = useLocation();
  const { formatMessage: f } = useLocale();
  const { data: sections } = useQuery("sections", () => listSections());

  if (isDesktop) {
    return (
      <div className="w-screen h-screen grid grid-cols-5 grid-rows-layout-desktop">
        <div className="col-span-1 p-2">
          <Link className="w-full" to={sections ? sections[0].to : "/"}>
            <img
              className="max-h-7"
              src="/images/play-logo-gray.png"
              alt="Play antropoloops"
            />
          </Link>
        </div>
        <div className="col-span-4 flex text-white items-center">
          {sections?.slice(1).map((section) => (
            <NavLink
              key={section.id}
              to={section.to}
              isActive={section.to === pathname}
              isExternal={section.external}
              className={`mr-4 ${section.to === pathname ? "text-green" : ""}`}
            >
              {f(section.id.toUpperCase())}
            </NavLink>
          ))}
        </div>
        <div className="overflow-y-auto bg-gray-medium">{children}</div>
        <div className="overflow-y-auto col-span-4 bg-gray-dark">{desktop}</div>
      </div>
    );
  } else {
    return (
      <div className={`App ${className || ""}`}>
        <div className="Header">
          {header || (
            <Header
              logo={logo}
              title={title}
              backTo={backTo}
              sections={sections || []}
            />
          )}
        </div>
        <div className="Content">{children}</div>
        {visuals ? (
          <div className="visuals">{visuals}</div>
        ) : desktop && isDesktop ? (
          <div className="visuals overflow-y-scroll">{desktop}</div>
        ) : null}
      </div>
    );
  }
};

export default Layout;
