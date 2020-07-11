import React, {
  useState,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import useSound from "use-sound";
import API from "../../api";
import LoadingPage from "../LoadingPage";
import Layout from "../../components/layout/Layout";
import { Markdown } from "../../components/Markdown";
import { Clip, Track, Audioset } from "../../../audioset";
import cx from "classcat";
import { Visuals } from "../../../visuals";

type RouteParams = {
  id: string;
};

type State = Record<string, boolean>;

type Action = { type: "start" | "stop"; clipId: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "start":
      return { [action.clipId]: true };
    case "stop":
      return { ...state, [action.clipId]: false };
  }
}

const ExplorePage: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );
  const { visuals, visualsRef } = useVisuals(audioset);
  const [playing, dispatch] = useReducer(reducer, {});

  if (!audioset) return <LoadingPage />;

  return (
    <Layout
      desktop={
        <div className="visuals">
          <div className="visuals-display" ref={visualsRef} />
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
          <Markdown className="text-white" markdown={audioset.meta.readme} />
        </div>
        {audioset.tracks.map((track) => (
          <div
            className="relative"
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
                  isOpen={playing[clipId] || false}
                  start={() => dispatch({ type: "start", clipId })}
                  stop={() => dispatch({ type: "stop", clipId })}
                  visuals={visuals}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default ExplorePage;

type ClipViewProps = {
  track: Track;
  clip: Clip;
  isOpen: boolean;
  start: () => void;
  stop: () => void;
  visuals: Visuals | typeof NoVisuals;
};

const ClipView: React.FC<ClipViewProps> = ({
  clip,
  track,
  isOpen,
  start,
  stop,
  visuals,
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
      visuals.show(clip.id);
    } else {
      stopAudio();
      visuals.hide(clip.id);
    }
  }, [isOpen, playAudio, stopAudio, visuals, clip.id]);

  return (
    <button
      className="flex items-center font-thin focus:outline-none mb-1"
      style={{ backgroundColor: track.color, opacity: isLoaded ? 1 : 0.5 }}
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

const NoVisuals = {
  show: (id: string) => undefined,
  hide: (id: string) => undefined,
};

function useVisuals(audioset: Audioset | undefined) {
  // Make visuals render after reference is set: https://dev.to/thekashey/the-same-useref-but-it-will-callback-8bo
  const [el, setReference] = useState<HTMLDivElement | null>(null);
  const visualsRef = useCallback((newRef: HTMLDivElement) => {
    setReference(newRef);
  }, []);

  const visuals = useMemo(() => {
    if (!audioset || !el) return NoVisuals;

    const v = new Visuals(audioset, el);
    v.setup();
    return v;
  }, [audioset, el]);

  return { visualsRef, visuals };
}
