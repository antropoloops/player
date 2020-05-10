import React, { FunctionComponent, ReactNode } from "react";
import { Audioset } from "../../../audioset";
import { Header } from "../Header";
import { Scroll } from "../Scroll";
import { Footer } from "./Footer";

interface SidebarProps {
  audioset: Audioset;
  header?: () => ReactNode;
  onFullscreen: () => void;
  onStopAll: () => void;
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  audioset,
  header,
  onFullscreen,
  onStopAll,
  children,
}) => {
  return (
    <>
      {header ? header() : <Header meta={audioset.meta} />}
      <Scroll>
        <div className="content">{children}</div>
      </Scroll>
      <Footer onFullscreen={onFullscreen} onStopAll={onStopAll} />
    </>
  );
};
