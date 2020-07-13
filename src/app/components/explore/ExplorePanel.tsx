import React, { useState, useReducer, useEffect } from "react";
import useSound from "use-sound";
import Layout from "../../components/layout/Layout";
import { Markdown } from "../../components/Markdown";
import { Clip, Track, Audioset } from "../../../audioset";
import cx from "classcat";
import { useDeviceType } from "../../hooks/useDeviceType";
import PanelVisuals from "../../components/explore/PanelVisuals";
import routes from "../../routes";

type State = { clipId: string };

type Action = { type: "start" | "stop"; clipId: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { clipId: action.clipId };
    case "stop":
      return { clipId: "" };
  }
}

type Props = {
  audioset: Audioset;
};

const ExplorePanel: React.FC<Props> = ({ audioset }) => {
  const { isDesktop } = useDeviceType();
  const [playing, dispatch] = useReducer(reducer, { clipId: "" });

  // FIXME: remove when backend fixed
  const { parent_path, path } = audioset.meta;
  const backTo =
    parent_path && parent_path !== path ? parent_path : routes.sets();

  return (
    <Layout
      title={audioset.meta.title}
      backTo={backTo}
      visuals={
        <PanelVisuals audioset={audioset} activeClipId={playing.clipId} />
      }
    >
      <div className="flex-grow overflow-y-scroll">
        {false && isDesktop && (
          <img
            className="w-full"
            alt={audioset.meta.title}
            src={audioset.meta.logo_url}
          />
        )}
        {false && isDesktop && (
          <div className="p-4">
            <Markdown className="text-white" markdown={audioset.meta.readme} />
          </div>
        )}
        {audioset.tracks.map((track) => (
          <div
            className="w-full relative"
            key={track.id}
            style={{ backgroundColor: track.color }}
          >
            <div className="bg-black bg-opacity-25">
              <h3 className="p-2 text-white">{track.name}</h3>
              {track.clipIds.map((clipId) => (
                <ClipView
                  key={clipId}
                  track={track}
                  clip={audioset.index.clipById[clipId]}
                  isOpen={playing.clipId === clipId}
                  start={() => dispatch({ type: "start", clipId })}
                  stop={() => dispatch({ type: "stop", clipId })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default ExplorePanel;

type ClipViewProps = {
  track: Track;
  clip: Clip;
  isOpen: boolean;
  start: () => void;
  stop: () => void;
};

const ClipView: React.FC<ClipViewProps> = ({
  clip,
  track,
  isOpen,
  start,
  stop,
}) => {
  const [isLoaded, setLoaded] = useState(false);

  const [playAudio, { stop: stopAudio }] = useSound(clip.resources.audio.mp3, {
    onload: () => {
      setLoaded(true);
    },
  });

  useEffect(() => {
    if (isOpen) {
      playAudio();
    } else {
      stopAudio();
    }
  }, [isOpen, playAudio, stopAudio]);

  return (
    <button
      className="w-full flex items-center focus:outline-none mb-1"
      style={{ backgroundColor: track.color, opacity: isLoaded ? 1 : 0.1 }}
      onClick={() => {
        if (!isLoaded) return;
        if (isOpen) stop();
        else start();
      }}
    >
      <div className={cx(["ratio flex-shrink-0", isOpen ? "w-1/2" : "w-1/4"])}>
        <svg viewBox="0 0 1 1" />
        <img
          className="w-full"
          width="300"
          height="300"
          src={clip.resources.cover.small}
          alt={clip.title}
        />
      </div>
      <label className="p-2">{clip.title}</label>
    </button>
  );
};
