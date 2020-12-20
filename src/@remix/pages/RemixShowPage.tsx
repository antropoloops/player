import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import BackToLink from "../../components/BackToHeaderLink";
import { PlayCircleIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import LoadingScreen from "../../components/LoadingScreen";
import IconLink from "../../components/shared/IconLink";
import routes from "../../routes";
import TrackContainer from "../../components/simple-player/TrackContainer";
import ShowEditRemix from "../components/remix/ShowEditRemix";
import ShowEditTrack from "../components/remix/ShowEditTrack";
import ShowEditClip from "../components/remix/ShowEditClip";
import { Project, Selection, Track } from "../../models";
import { Waveform } from "../../@sounds/components/Waveform";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import MediaObject from "../../components/MediaObject";

type Params = {
  id: string;
  type?: string;
  childId?: string;
};

type Props = {
  className?: string;
};

export function RemixShowPage({ className }: Props) {
  const params = useParams<Params>();
  const group = useCurrentGroup();
  const history = useHistory();

  const gotoTrack = (track: Track) =>
    history.push(routes.remixTrack(params.id, track.id));

  const { data: remix } = useObserveModel(Project, params.id);
  const { data: tracks } = useObserveList(Track, (t) =>
    t.projectID("eq", params.id)
  );
  const { data: selections } = useObserveList(Selection, (t) =>
    t.projectID("eq", params.id)
  );

  if (!group || !remix || !tracks || !selections) return <LoadingScreen />;

  const track =
    params.type === "t" && tracks.find((track) => track.id === params.childId);
  const sample =
    params.type === "c" &&
    selections.find((track) => track.id === params.childId);

  const editor = sample ? (
    <ShowEditClip group={group} remix={remix} tracks={tracks} sample={sample} />
  ) : track ? (
    <ShowEditTrack
      group={group}
      remix={remix}
      track={track}
      selections={selections}
      onChange={() => {}}
    />
  ) : (
    <ShowEditRemix
      group={group}
      remix={remix}
      tracks={tracks}
      samples={selections}
    />
  );

  return (
    <Layout nav="projects" desktop={editor}>
      <BackToLink to={routes.remixes()} label="Remezclas" />
      <Link to={routes.remix(params.id)}>
        <img src={"/images/gray-light.png"} alt="Remix" />
      </Link>
      <h2 className="flex text-left p-1 bg-remixes text-bg-dark">
        <Link className="flex-grow" to={routes.remix(params.id)}>
          {remix?.meta.title || "..."}
          <span className="ml-4 text-xs">{group.name}</span>
        </Link>
        <IconLink icon={PlayCircleIcon} to={routes.remixPlay(params.id)}>
          Play
        </IconLink>
      </h2>
      <div>
        {tracks.map((track) => (
          <TrackContainer
            key={track.id}
            track={{
              id: track.id,
              name: track.meta.name || "",
              color: track.meta.color || "",
            }}
            status={{
              playing: false,
              time: 0,
            }}
            onStopTrack={() => undefined}
            onClick={() => {
              gotoTrack(track);
            }}
          >
            <div className="w-full bg-gray-dark">
              <div className="bg-gray-medium bg-opacity-50">
                {track.clips.map((clip) => {
                  const selection = selections.find(
                    (s) => s.id === clip.selectionID
                  );
                  if (!selection) return null;
                  const thumbnail = selection.media?.file.thumbnail;

                  return (
                    <MediaObject
                      key={clip.selectionID}
                      alt={""}
                      margin=""
                      imageSize="w-cover-mini"
                      ratio="1:1"
                      to={routes.remixClip(remix.id, selection.id)}
                      style={{ backgroundColor: track.meta.color }}
                    >
                      <div className="mx-1 flex-grow">
                        <div className="text-xs my-1 truncate">
                          {selection.media?.meta.title}
                        </div>
                        <Waveform
                          className="opacity-50"
                          width={100}
                          height={10}
                          points={thumbnail || ""}
                        />
                      </div>
                    </MediaObject>
                  );
                })}
              </div>
            </div>
          </TrackContainer>
        ))}
      </div>
    </Layout>
  );
}

export default RemixShowPage;
