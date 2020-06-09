import React, { ReactNode } from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
import { ArrowLeft } from "./Icons";
import useAnalytics from "../hooks/useAnalytics";

type Props = {
  header?: string;
  headerPath?: string;
  visuals: ReactNode;
};

const Layout: React.FC<Props> = ({
  header,
  headerPath = routes.root(),
  children,
  visuals,
}) => {
  useAnalytics();
  return (
    <div className="App">
      <div className="Header">
        <div className="p-2">
          {header ? (
            <Link className="flex align-center text-white" to={headerPath}>
              <ArrowLeft className="text-gray-light" />
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
      <div className="visuals">{visuals}</div>
    </div>
  );
};

export default Layout;
