import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import { useRouteMatch } from "react-router-dom";
import { useDeviceType } from "../../hooks/useDeviceType";
import API from "../../api";
import LoadingPage from "../LoadingPage";
import { Audioset, Clip, Track } from "../../../audioset";
import { ArrowRight } from "../../components/Icons";

type Props = {};

type RouteParams = {
  id: string;
};

type PlayerView =
  | { view: "overview" }
  | { view: "track"; id: string }
  | { view: "clip"; id: string };

const PlayerPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { isMobile } = useDeviceType();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );
  const [current, setView] = useState<PlayerView>({ view: "overview" });

  const clipsByTrack = useMemo(
    () => (audioset ? getClipsByTrack(audioset) : {}),
    [audioset]
  );

  if (!audioset) return <LoadingPage />;

  return (
    <Layout title={audioset.meta.title}>
      <div className="flex-grow overflow-y-scroll text-white">
        {current.view === "overview" ? (
          <Overview tracks={audioset.tracks} clipsByTrack={clipsByTrack} />
        ) : null}
      </div>
      <div className="grid grid-cols-8 gap-1 bg-gray-dark p-1">
        {audioset.tracks.map((track) => (
          <div
            key={track.id}
            className="ratio border-2"
            style={{ borderColor: track.color }}
          >
            <svg viewBox="0 0 1 1" />
          </div>
        ))}
      </div>
    </Layout>
  );
};

function getClipsByTrack(audioset: Audioset) {
  return audioset.clips.reduce((index, clip) => {
    index[clip.trackId] = index[clip.trackId] || [];
    index[clip.trackId].push(clip);
    return index;
  }, {} as Record<string, Clip[]>);
}

export default PlayerPage;

type OverviewProps = {
  tracks: Track[];
  clipsByTrack: Record<string, Clip[]>;
};

const Overview: React.FC<OverviewProps> = ({ tracks, clipsByTrack }) => (
  <>
    {tracks.map((track) => (
      <div key={track.id} className="relative">
        <div
          className="absolute inset-x-0 inset-y-0 z-0 opacity-75"
          style={{ backgroundColor: track.color }}
        />
        <button className="w-full flex p-2 z-10 relative">
          <div className="flex-grow text-left">{track.name}</div>
          <ArrowRight />
        </button>
        <div className="relative">
          {clipsByTrack[track.id].map((clip) => (
            <div
              key={clip.id}
              data-testid={`clip-${clip.id}`}
              className="flex mb-1 items-center"
              style={{ backgroundColor: track.color }}
            >
              <img
                className="w-1/4"
                alt={clip.title}
                src={clip.resources.cover.thumb}
              />
              <div className="ml-2 flex-grow">{clip.name}</div>
              <div className="flex-shrink-0 uppercase mr-2 w-8 h-8 text-center leading-8 rounded-full bg-gray-dark">
                {clip.keyMap}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);
