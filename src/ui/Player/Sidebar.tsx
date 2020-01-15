import React, { FunctionComponent } from "react";
import { Audioset } from "../../audioset";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";
import { Footer } from "./Footer";

interface SidebarProps {
  audioset: Audioset;
  onFullscreen: () => void;
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  audioset,
  onFullscreen,
  children,
}) => {
  return (
    <>
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">{children}</div>
      </Scroll>
      <Footer onFullscreen={onFullscreen} />
    </>
  );
};
