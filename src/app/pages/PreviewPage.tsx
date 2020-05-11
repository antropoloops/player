import React from "react";
import { Audioset } from "../../audioset";
import { Header } from "../components/Header";
import { Markdown } from "../components/Markdown";

type Props = {
  audioset: Audioset;
  onStart: () => void;
};

const PreviewPage: React.FC<Props> = ({ audioset, onStart }) => {
  return (
    <div className="App Audioset">
      <Header meta={audioset.meta} />
      <div className="Content">
        <div className="flex-grow overflow-y-scroll">
          <img
            className="w-full"
            alt={audioset.meta.title}
            src={audioset.meta.logo_url}
          />
          <div className="p-4">
            <Markdown className="text-white" markdown={audioset.meta.readme} />
          </div>
        </div>
        <div>
          <div className="w-full p-4 bg-gray-medium shadow-inner">
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
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
