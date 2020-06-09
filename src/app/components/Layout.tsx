import React, { ReactNode } from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
import { ArrowLeft } from "./Icons";
import useAnalytics from "../hooks/useAnalytics";
import { useDeviceType } from "../hooks/useDeviceType";

type Props = {
  header?: string;
  headerPath?: string;
  visuals?: ReactNode;
  desktop?: ReactNode;
};

const Layout: React.FC<Props> = ({
  header,
  headerPath = routes.root(),
  children,
  visuals,
  desktop,
}) => {
  useAnalytics();
  const { isDesktop } = useDeviceType();

  return (
    <div className="App">
      <div className="Header">
        <div className="p-2 group">
          {header ? (
            <Link className="flex align-center text-white" to={headerPath}>
              <ArrowLeft className="mr-2 text-gray-light group-hover:text-white" />
              {header}
            </Link>
          ) : (
            <Link to={headerPath} className="">
              <img src="/play-logo.png" alt="Play antropoloops" />
            </Link>
          )}
        </div>
      </div>
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
