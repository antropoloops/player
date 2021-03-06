import React, { ReactNode } from "react";
import useAnalytics from "../../hooks/useAnalytics";
import { useDeviceType } from "../../hooks/useDeviceType";
import HeaderMobile from "./HeaderMobile";
import { useQuery } from "react-query";
import { listSections } from "../../api/sections";
import NavLink from "./NavLink";
import useLocale from "../../hooks/useLocale";
import { useLocation, Link } from "react-router-dom";
import cc from "classcat";

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
        className="w-screen h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-layout-desktop"
      >
        <div data-testid="Header" className="col-span-1 p-2 bg-gray-darker">
          <Link
            className="w-full h-full flex items-center"
            to={sections ? sections[0].to : "/"}
          >
            <img
              className="max-h-7"
              src="/images/logo-play-white-small.png"
              alt="Play antropoloops"
            />
          </Link>
        </div>
        <div
          data-testid="Navigation"
          className="col-span-2 xl:col-span-3 bg-gray-darker"
        >
          <div className="ml-12 lg:ml-20 h-full flex text-white items-center ">
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
        </div>
        <div
          data-testid="Sidebar"
          className="h-full pr-3 overflow-y-scroll bg-gray-dark"
        >
          <div className="relative min-h-full bg-gray-medium">
            {sidebar || children}
          </div>
        </div>
        {visuals ? (
          <div className="overflow-hidden col-span-2 xl:col-span-3 bg-gray-dark">
            {visuals}
          </div>
        ) : (
          <div
            data-testid="Content"
            className="overflow-y-auto col-span-2 xl:col-span-3 bg-gray-dark"
          >
            {desktop}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={cc([className, "flex flex-col h-screen"])}>
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
        <div className="h-full overflow-scroll">{children}</div>
      </div>
    );
  }
};

export default Layout;
