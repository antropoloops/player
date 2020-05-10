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
          <div className="p-4">
            <Markdown className="text-white" markdown={audioset.meta.readme} />
          </div>
        </div>
      </Scroll>
      <footer className="Footer">
        <div className="w-full p-4 bg-gray-medium">
          <div className="w-full flex justify-center">
            <button
              className="p-2 rounded-full bg-green"
              title="Start playing"
              onClick={onStart}
            >
              <img className="h-8" src="/play.png" alt="Start" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewPage;
