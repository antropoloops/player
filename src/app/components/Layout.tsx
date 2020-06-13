import React, { ReactNode } from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
import { ArrowLeft } from "./Icons";
import useAnalytics from "../hooks/useAnalytics";
import { useDeviceType } from "../hooks/useDeviceType";

type Props = {
  title?: string;
  backTo?: string;
  visuals?: ReactNode;
  desktop?: ReactNode;
};

const Layout: React.FC<Props> = ({
  title,
  backTo = routes.root(),
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
          {title ? (
            <Link className="flex items-center text-white" to={backTo}>
              <ArrowLeft className="mr-2 text-gray-light group-hover:text-white" />
              {title}
            </Link>
          ) : (
            <Link to={backTo} className="">
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
