import React from "react";
import { Audioset } from "../../../audioset";
import HtmlContent from "../HtmlContent";
import Layout from "../layout/Layout";
import routes from "../../routes";
import { Section } from "../../api/sections";

type Props = {
  section?: Section;
  audioset: Audioset;
  onStart: () => void;
};

const PreviewAudioset: React.FC<Props> = ({ section, audioset, onStart }) => {
  return (
    <Layout
      title={audioset.meta.title}
      backTo={audioset.meta.parent_path || routes.sets()}
      desktop={
        <div className="text-white p-4 max-w-content text-justify">
          <h1 className="text-4xl mb-4">{audioset.meta.title}</h1>
          <HtmlContent content={audioset.meta.readme} />
        </div>
      }
      sidebar={
        <div className="h-full overflow-y-scroll">
          <img
            className="w-full"
            alt={audioset.meta.title}
            src={audioset.meta.logo_url}
          />
          <div className="mt-4 w-full flex justify-center">
            <button
              className="p-2 rounded-full bg-green"
              title="Start playing"
              onClick={onStart}
            >
              <img className="h-8" src="/play.png" alt="Start" />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex-grow overflow-y-scroll">
        <img
          className="w-full"
          alt={audioset.meta.title}
          src={audioset.meta.logo_url}
        />
        <div className="p-4">
          <HtmlContent className="text-white" content={audioset.meta.readme} />
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
    </Layout>
  );
};

export default PreviewAudioset;
