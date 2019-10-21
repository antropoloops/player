import React from "react";
import { Link } from "react-router-dom";
import { AudiosetProject, AudiosetReference } from "../Audioset";
import "./Project.css";
import { Scroll } from "./Scroll";
import { Header } from "./shared/Header";
import { Markdown } from "./shared/Markdown";
import { useIsDesktop } from "./useIsDesktop";

interface ProjectProps {
  audioset: AudiosetProject;
}

const Project = ({ audioset }: ProjectProps) => {
  const audiosets = audioset.audiosets || [];
  const isDesktop = useIsDesktop();

  return (
    <div className="App Project">
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          {!isDesktop && (
            <div>
              <img
                alt={audioset.meta.title}
                src={audioset.meta.logo_url}
                style={{ width: "100%" }}
              />
              <Markdown className="mobile" markdown={audioset.meta.readme} />
            </div>
          )}
          <ul className="Audiosets">
            {audiosets.map(child => (
              <AudiosetView key={child.id} audioset={child} />
            ))}
          </ul>
        </div>
      </Scroll>
      {isDesktop && (
        <div className="visuals">
          <Markdown markdown={audioset.meta.readme} />
        </div>
      )}
      <div className="footer">Welcome</div>
    </div>
  );
};

export default Project;

interface AudiosetViewProps {
  audioset: AudiosetReference;
}
const AudiosetView = ({ audioset }: AudiosetViewProps) => (
  <Link to={`/set/${audioset.publish_path}`}>
    <div className="Audioset">
      <img src={audioset.logo_url} alt={audioset.title} />
      <div className="meta">
        <h3>{audioset.title} →</h3>
        <p>{audioset.description}</p>
      </div>
    </div>
  </Link>
);
