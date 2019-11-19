import React from "react";
import { AudiosetProject } from "../../audioset";
import { Readme } from "../Player/Readme";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { AudiosetItem } from "./AudiosetItem";
import "./Browser.css";

interface BrowserProps {
  audioset: AudiosetProject;
}

export const Browser = ({ audioset }: BrowserProps) => {
  const audiosets = audioset.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App Browser">
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          <img
            alt={audioset.meta.title}
            src={audioset.meta.logo_url}
            style={{ width: "100%" }}
          />
          {isMobile && (
            <div>
              <Readme closed={true} content={audioset.meta.readme} />
            </div>
          )}
          <ul className="Audiosets">
            {audiosets.map(child => (
              <AudiosetItem key={child.id} audioset={child} />
            ))}
          </ul>
        </div>
      </Scroll>
      {isDesktop && (
        <div className="visuals">
          <Markdown markdown={audioset.meta.readme} />
        </div>
      )}
    </div>
  );
};
