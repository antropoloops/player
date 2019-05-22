import React from "react";
import { isMobileOnly } from "react-device-detect";
import Sidebar from "./Sidebar";

const isDesktop = !isMobileOnly;

const div = name => props => (
  <div
    {...props}
    className={`${name} ${props.className} ${
      isDesktop ? "isDesktop" : "isMobile"
    }`}
  >
    {props.children}
  </div>
);

const Layout = div("App");

Layout.Sidebar = Sidebar;
Layout.Main = isDesktop ? div("Main") : () => <div />;

export default Layout;
