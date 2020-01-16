import React from "react";
import { Project as ProjectData } from "../../audioset";
import { Readme } from "../Player/Readme";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { Item } from "./Item";
import "./Project.css";

interface ProjectProps {
  project: ProjectData;
}

export const Project = ({ project }: ProjectProps) => {
  const references = project.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App Project">
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
              <Readme content={project.meta.readme} />
            </div>
          )}
          <ul className="Audiosets">
            {references.map(reference => (
              <Item key={reference.id} reference={reference} />
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
