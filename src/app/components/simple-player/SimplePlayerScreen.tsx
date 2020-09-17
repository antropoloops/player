import React from "react";
import { Audioset } from "../../../audioset";
import Layout from "../../components/layout/Layout";
import useSimplePlayer from "../../hooks/useSimplePlayer";
import { PlayerState } from "../../simplePlayer/types";
import SimpleMapVisuals from "./SimpleMapVisuals";
import SimplePanelVisuals from "./SimplePanelVisuals";
import SimpleTrack from "./SimpleTrack";

type Props = {
  audioset: Audioset;
};

const SimplePlayerScreen: React.FC<Props> = ({ audioset }) => {
  const [state, dispatch] = useSimplePlayer(audioset);

  return (
    <Layout
      title={audioset?.meta.title}
      backTo={audioset?.meta.parent_path}
      visuals={<Visuals audioset={audioset} state={state} />}
    >
      <div className="pb-4">
        {audioset?.tracks?.map((track) => (
          <SimpleTrack
            audioset={audioset}
            track={track}
            state={state}
            onClipClick={(clipId) =>
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
    </Layout>
  );
};

export default SimplePlayerScreen;

type VisualsProps = {
  audioset?: Audioset;
  state: PlayerState;
};
const Visuals: React.FC<VisualsProps> = ({ audioset, state }) => {
  if (!audioset) {
    return <div></div>;
  } else if (audioset.visuals.mode === "map") {
    return <SimpleMapVisuals audioset={audioset} state={state} />;
  } else if (audioset.visuals.mode === "panel") {
    return <SimplePanelVisuals audioset={audioset} state={state} />;
  } else {
    return <div>error</div>;
  }
};
