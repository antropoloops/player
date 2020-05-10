import React from "react";
import { Project } from "../../audioset";
import { useDeviceType } from "../hooks/useDeviceType";
import { Readme } from "../components/Player/Readme";
import { Link } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { ArrowLeft } from "../components/Icons";

type Props = {
  project: Project;
};
const BrowsePage: React.FC<Props> = ({ project }) => {
  const references = project.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App">
      <div className="Header">
        <div className="p-2">
          {project.meta.parent_path === "" ? (
            <Link to="/" className="">
              <img src="/play-logo.png" alt="Play antropoloops" />
            </Link>
          ) : (
            <Link
              className="flex align-center text-white"
              to={project.meta.parent_path}
            >
              <ArrowLeft className="text-gray-light" />
              {project.meta.title}
            </Link>
          )}
        </div>
      </div>
      <div className="scroll">
        <div className="h-full bg-gray-dark">
          <img
            className="w-full"
            alt={project.meta.title}
            src={project.meta.logo_url}
          />
          {isMobile && (
            <div>
              <Readme className="px-2" content={project.meta.readme} />
            </div>
          )}
          <ul className="Audiosets">
            {references.map((reference) => (
              <Link
                className="mb-2 flex w-full text-white bg-gray-light"
                to={`/set/${reference.publish_path}`}
                key={reference.id}
              >
                <div className="w-1/3 flex-shrink-0">
                  {/* This is hack to keep img in Safari responsive */}
                  <img
                    className="w-full"
                    src={reference.logo_url}
                    alt={reference.title}
                  />
                </div>
                <div className="mx-2">
                  <h3 className="font-normal">{reference.title}</h3>
                  <p className="text-sm">{reference.description}</p>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {isDesktop && (
        <div className="visuals">
          <Markdown
            className="h-full bg-gray-medium text-white px-4 py-2"
            markdown={project.meta.readme}
          />
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
