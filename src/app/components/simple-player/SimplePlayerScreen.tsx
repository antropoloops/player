import React from "react";
import { Audioset } from "../../../audioset";
import Layout from "../../components/layout/Layout";
import Clip from "../../components/simple-player/SimpleClip";
import useSimplePlayer from "../../hooks/useSimplePlayer";
import { StoppedStatus } from "../../simplePlayer";
import SimplePanelVisuals from "./SimplePanelVisuals";

type Props = {
  audioset: Audioset;
};

const SimplePlayerScreen: React.FC<Props> = ({ audioset }) => {
  const [state, dispatch] = useSimplePlayer(audioset);

  return (
    <Layout
      title={audioset?.meta.title}
      backTo={audioset?.meta.parent_path}
      visuals={
        audioset &&
        audioset.visuals.mode === "panel" && (
          <SimplePanelVisuals audioset={audioset} state={state} />
        )
      }
    >
      {audioset?.tracks?.map((track) => (
        <div
          key={track.id}
          className=""
          style={{ backgroundColor: track.color }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gray-dark opacity-25"></div>
            <h3 className="p-2 z-10">{track.name}</h3>
          </div>

          <div className="">
            {track.clipIds.map((clipId) => (
              <Clip
                key={clipId}
                status={state.clips[clipId] || StoppedStatus}
                clip={audioset.index.clipById[clipId]}
                onClick={() =>
                  dispatch({
                    type: "trigger",
                    clipId,
                    trackId: track.id,
                    playing: !state.clips[clipId]?.playing,
                  })
                }
              />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default SimplePlayerScreen;
