import React from "react";
import { Audioset } from "../../audioset";
import { Markdown } from "../components/Markdown";
import Layout from "../components/Layout";
import { useDeviceType } from "../hooks/useDeviceType";

type Props = {
  audioset: Audioset;
  onStart: () => void;
};

const PreviewPage: React.FC<Props> = ({ audioset, onStart }) => {
  const { isMobile } = useDeviceType();
  return (
    <Layout
      title={audioset.meta.title}
      backTo={audioset.meta.parent_path}
      desktop={
        <Markdown className="text-white p-4" markdown={audioset.meta.readme} />
      }
    >
      <div className="flex-grow overflow-y-scroll">
        <img
          className="w-full"
          alt={audioset.meta.title}
          src={audioset.meta.logo_url}
        />
        {isMobile && (
          <div className="p-4">
            <Markdown className="text-white" markdown={audioset.meta.readme} />
          </div>
        )}
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

export default PreviewPage;
