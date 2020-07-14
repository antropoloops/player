import React, { ReactNode } from "react";
import useAnalytics from "../../hooks/useAnalytics";
import { useDeviceType } from "../../hooks/useDeviceType";
import HeaderMobile from "./HeaderMobile";
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
  sidebar?: ReactNode;
  visuals?: ReactNode;
  desktop?: ReactNode;
};

const Layout: React.FC<Props> = ({
  className,
  logo,
  title,
  backTo,
  header,
  sidebar,
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
      <div
        data-testid="App"
        className="w-screen h-screen grid grid-cols-3 lg:grid-cols-4 grid-rows-layout-desktop"
      >
        <div data-testid="Header" className="col-span-1 p-2">
          <Link
            className="w-full h-full flex items-center"
            to={sections ? sections[0].to : "/"}
          >
            <img
              className="max-h-7"
              src="/images/play-logo-gray.png"
              alt="Play antropoloops"
            />
          </Link>
        </div>
        <div
          data-testid="Navigation"
          className="ml-12 col-span-2 lg:col-span-3 flex text-white items-center"
        >
          {sections?.slice(1).map((section) => (
            <NavLink
              key={section.id}
              to={section.to}
              isActive={pathname === section.to}
              isExternal={section.external}
              className={`mr-4 cursor-pointer ${
                pathname.startsWith(section.to) ? "text-green" : ""
              }`}
            >
              {f(section.id)}
            </NavLink>
          ))}
        </div>
        <div data-testid="Sidebar" className="overflow-y-auto bg-gray-medium">
          {sidebar || children}
        </div>
        {visuals ? (
          <div className="overflow-hidden col-span-2 lg:col-span-3 bg-gray-dark">
            {visuals}
          </div>
        ) : (
          <div
            data-testid="Content"
            className="overflow-y-auto col-span-2 lg:col-span-3 bg-gray-dark"
          >
            {desktop}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={`App ${className || ""}`}>
        {visuals && <div className="visuals">{visuals}</div>}
        <div className="Header">
          {header || (
            <HeaderMobile
              logo={logo}
              title={title}
              backTo={backTo}
              sections={sections || []}
            />
          )}
        </div>
        <div className="Content">{children}</div>
      </div>
    );
  }
};

export default Layout;
