/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { AudiosetProject, AudiosetReference } from "../Audioset";
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
              <Markdown markdown={audioset.meta.readme} />
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
        <div css={cssReadme} className="visuals">
          <Markdown markdown={audioset.meta.readme} />
        </div>
      )}
      <div className="footer">Welcome</div>
    </div>
  );
};

const cssReadme = css`
  background: url(/bg-low.jpg) no-repeat center center fixed;
  background-size: cover;
  color: white;

  & > div: {
    padding: 1rem;
  }
`;

export default Project;

const cssCover = css`
  width: 100px;
`;

const cssAudioset = css`
  display: flex;
  flex-direction: row;
`;

interface AudiosetViewProps {
  audioset: AudiosetReference;
}
const AudiosetView = ({ audioset }: AudiosetViewProps) => (
  <Link to={`/set/${audioset.publish_path}`}>
    <div className="Audioset" css={cssAudioset}>
      <img css={cssCover} src={audioset.logo_url} alt={audioset.title} />
      <div className="meta">
        <h3>{audioset.title} →</h3>
        <p>{audioset.description}</p>
      </div>
    </div>
  </Link>
);
