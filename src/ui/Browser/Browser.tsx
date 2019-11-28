import React from "react";
import { Project } from "../../audioset";
import { Readme } from "../Player/Readme";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { AudiosetReference } from "./AudiosetReference";
import "./Browser.css";

interface BrowserProps {
  project: Project;
}

export const Browser = ({ project }: BrowserProps) => {
  const references = project.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App Browser">
      <Header meta={project.meta} />
      <Scroll>
        <div className="content">
          <img
            alt={project.meta.title}
            src={project.meta.logo_url}
            style={{ width: "100%" }}
          />
          {isMobile && (
            <div>
              <Readme closed={true} content={project.meta.readme} />
            </div>
          )}
          <ul className="Audiosets">
            {references.map(reference => (
              <AudiosetReference key={reference.id} reference={reference} />
            ))}
          </ul>
        </div>
      </Scroll>
      {isDesktop && (
        <div className="visuals">
          <Markdown markdown={project.meta.readme} />
        </div>
      )}
    </div>
  );
};
