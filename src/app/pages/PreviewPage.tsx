import React from "react";
import { Audioset } from "../../audioset";
import { Scroll } from "../shared/Scroll";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";

type Props = {
  audioset: Audioset;
  onStart: () => void;
};

const PreviewPage: React.FC<Props> = ({ audioset, onStart }) => {
  return (
    <div className="App Audioset">
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          <img
            className="responsive"
            alt={audioset.meta.title}
            src={audioset.meta.logo_url}
          />
          <div className="info">
            <div className="actions">
              <button
                className="start btn-link"
                title="Start playing"
                onClick={onStart}
              >
                <img src="/play.png" alt="Start" />
              </button>
            </div>
            <Markdown markdown={audioset.meta.readme} />
          </div>
          >
        </div>
      </Scroll>
      <div>Adios</div>
    </div>
  );
};

export default PreviewPage;
