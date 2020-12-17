import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/layout/Layout";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import LoadingScreen from "../../components/LoadingScreen";
import { Audioset, Clip, Track } from "../../audioset";
import { GearIcon, ArrowLeft } from "../../components/Icons";
import Overview from "../../components/play-next/Overview";
import Options from "../../components/play-next/Options";
import TrackView from "../../components/play-next/TrackView";

type Props = {};

type RouteParams = {
  id: string;
};

type PlayerView = { name?: string; track?: Track; clip?: Clip };

const PlayerPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset } = useQuery(["project", params.id], () =>
    API.audiosets.get({ path: params.id })
  );
  const [view, setView] = useState<PlayerView>({});

  const clipsByTrack = useMemo(
    () => (audioset ? getClipsByTrack(audioset) : {}),
    [audioset]
  );

  if (!audioset) return <LoadingScreen />;

  const Header = () => {
    return (
      <div className="p-2 flex text-white font-normal">
        <span className="flex-grow">{audioset.meta.title}</span>
        <button
          className="text-white opacity-75 hover:opacity-100 flex-shrink-0 focus:outline-none"
          onClick={() =>
            setView(view.name === "options" ? {} : { name: "options" })
          }
        >
          <GearIcon />
        </button>
      </div>
    );
  };

  return (
    <Layout
      title={audioset.meta.title}
      header={
        view.track ? (
          <TrackHeader track={view.track} onClick={() => setView({})} />
        ) : (
          <Header />
        )
      }
    >
      <div className="flex-grow overflow-y-scroll text-white">
        {view.track ? (
          <TrackView
            active={view.clip}
            track={view.track}
            clips={clipsByTrack[view.track.id]}
            onClick={(clip, track) => {
              setView({ clip, track });
            }}
          />
        ) : view.name === "options" ? (
          <Options audioset={audioset} />
        ) : (
          <Overview
            tracks={audioset.tracks}
            clipsByTrack={clipsByTrack}
            onTrack={(track) => setView({ track })}
            onClip={(clip, track) => setView({ clip, track })}
          />
        )}
      </div>
      <div className="grid grid-cols-8 gap-1 bg-gray-dark p-1">
        {audioset.tracks.map((track) => (
          <button
            key={track.id}
            className="ratio border-2"
            style={{ borderColor: track.color }}
            onClick={() => setView({ track })}
          >
            <svg viewBox="0 0 1 1" />
          </button>
        ))}
      </div>
    </Layout>
  );
};
export default PlayerPage;

function getClipsByTrack(audioset: Audioset) {
  return audioset.clips.reduce((index, clip) => {
    index[clip.trackId] = index[clip.trackId] || [];
    index[clip.trackId].push(clip);
    return index;
  }, {} as Record<string, Clip[]>);
}

type TrackHeaderProps = {
  track: Track;
  onClick: () => void;
};

const TrackHeader: React.FC<TrackHeaderProps> = ({ track, onClick }) => {
  return (
    <div
      className="p-2 text-white font-normal"
      style={{ backgroundColor: track.color }}
    >
      <button
        className="flex items-center text-white opacity-75 hover:opacity-100 flex-shrink-0 focus:outline-none mr-2"
        onClick={onClick}
      >
        <ArrowLeft className="mr-2" />
        {track.name}
      </button>
    </div>
  );
};
