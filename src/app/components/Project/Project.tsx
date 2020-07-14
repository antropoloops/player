import React from "react";
import { Link } from "react-router-dom";
import { Project as ProjectData } from "../../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import { Header } from "../Header";
import { Info } from "../Icons";
import HtmlContent from "../HtmlContent";
import { Scroll } from "../Scroll";
import { Readme } from "../Player/Readme";
import { Item } from "./Item";
import "./Project.css";
import routes from "../../routes";

interface ProjectProps {
  project: ProjectData;
}

/**
 * A Project is an collection of Audiosets. This view
 * displays a browser to select on of it.
 */
export const Project = ({ project }: ProjectProps) => {
  const references = project.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App Project">
      <Header meta={project.meta} />
      <Scroll>
        <div className="content">
          <img
            className="responsive"
            alt={project.meta.title}
            src={project.meta.logo_url}
            style={{ width: "100%" }}
          />
          {isMobile && (
            <div>
              <Readme
                className="bg-gray-medium"
                content={project.meta.readme}
              />
            </div>
          )}
          <ul className="Audiosets">
            {references.map((reference) => (
              <Item key={reference.id} reference={reference} />
            ))}
          </ul>
        </div>
      </Scroll>
      <footer className="Footer">
        <div className="left">
          <Link to={routes.about()}>
            <Info />
          </Link>
        </div>
      </footer>
      {isDesktop && (
        <div className="visuals">
          <HtmlContent content={project.meta.readme} />
        </div>
      )}
    </div>
  );
};
