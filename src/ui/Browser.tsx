import React from "react";
import { Link } from "react-router-dom";
import { AudiosetProject, AudiosetReference } from "../audioset";
import "./Browser.css";
import { Scroll } from "./Scroll";
import { Header } from "./shared/Header";
import { Markdown } from "./shared/Markdown";
import { useDeviceType } from "./useDeviceType";

interface ProjectProps {
  audioset: AudiosetProject;
}

const Project = ({ audioset }: ProjectProps) => {
  const audiosets = audioset.audiosets || [];
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <div className="App Project">
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          {isMobile && (
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
      <div className="footer">Welcome</div>
    </div>
  );
};

export default Project;

interface AudiosetItemProps {
  audioset: AudiosetReference;
}
const AudiosetItem = ({ audioset }: AudiosetItemProps) => (
  <Link to={`/set/${audioset.publish_path}`}>
    <div className="AudiosetItem">
      <img src={audioset.logo_url} alt={audioset.title} />
      <div className="meta">
        <h3>{audioset.title}</h3>
        <p>{audioset.description}</p>
      </div>
    </div>
  </Link>
);
