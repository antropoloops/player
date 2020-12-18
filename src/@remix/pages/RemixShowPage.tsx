import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import {
  useGetRemixQuery,
  useListRemixSelectionsQuery,
  useListRemixTracksQuery,
} from "../hooks/useRemixQueries";
import { createTrack } from "../../@backend/service";
import BackToLink from "../../components/BackToLink";
import { AddIcon, PlayCircleIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import LoadingScreen from "../../components/LoadingScreen";
import IconLink from "../../components/shared/IconLink";
import routes from "../../routes";
import IconButtonBig from "../components/shared/Buttons";
import TrackContainer from "../../components/simple-player/TrackContainer";
import { IconButton } from "../../components/shared/IconButton";
import { ShowRemix } from "../components/ShowRemix";
import { TrackEditor } from "../components/TrackEditor";
import { Track } from "../../models";
import { Waveform } from "../../@sounds/components/Waveform";

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
    history.push(routes.remixRelation(params.id, "t", track.id));

  const project = {
    groupId: group?.id || "",
    projectId: params.id,
  };

  const { data: remix } = useGetRemixQuery(project);
  const { data: tracks, refetch: refetchTracks } = useListRemixTracksQuery(
    project
  );
  const {
    data: selections,
    refetch: refetchSelections,
  } = useListRemixSelectionsQuery(project);

  if (!group || !remix || !tracks || !selections) return <LoadingScreen />;

  const track = tracks.find((track) => track.id === params.childId);

  const refetchAll = () => {
    refetchTracks();
    refetchSelections();
  };

  const editor =
    params.type === "t" ? (
      <TrackEditor
        group={group}
        remix={remix}
        track={track}
        selections={selections}
        onChange={refetchAll}
      />
    ) : (
      <ShowRemix group={group} remix={remix} />
    );

  return (
    <Layout desktop={editor}>
      <BackToLink to={routes.remixes()} label="Remezclas" />
      <Link to={routes.remix(params.id)}>
        <img src={"/images/gray-light.png"} alt="Remix" />
      </Link>
      <h2 className="flex text-left p-1 mb-1 bg-remixes text-bg-dark">
        <Link className="flex-grow" to={routes.remix(params.id)}>
          {group.name} - {remix?.meta.title || "..."}
        </Link>
        <IconLink icon={PlayCircleIcon} to={routes.remixPlay(params.id)}>
          Play
        </IconLink>
      </h2>
      <div>
        <IconButtonBig
          icon={AddIcon}
          onClick={() => {
            createTrack(remix, { name: "Nueva Pista" }).then((track) => {
              refetchTracks();
              gotoTrack(track);
            });
          }}
        >
          Añadir pista
        </IconButtonBig>
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
                    <div
                      key={clip.selectionID}
                      className="w-full flex items-stretch"
                    >
                      <div className="ratio w-1/4">
                        <svg viewBox="0 0 1 1" />
                        <img src="/images/gray-light.png" alt="placeholder" />
                      </div>
                      <div className="mx-1 flex-grow">
                        <div className="text-xs my-1">
                          {selection.media?.meta.title}
                        </div>
                        <Waveform
                          width={100}
                          height={10}
                          points={thumbnail || ""}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* {[].map((clipId) => (
                  <Clip
                    className="mb-micro last:mb-0"
                    key={clipId}
                    status={{ playing: false, time: 0 }}
                    clip={safeFindClipById(audioset, clipId)}
                    onClick={() => {
                      // setEditor('clip')
                      // history.push(
                      //   routes.remixEditItemChild(params.id, "clip", clipId)
                      // );
                    }}
                    isStream={false}
                    skipAudio
                  />
                ))} */}
              </div>
              <div className="flex p-1">
                <IconButton icon={AddIcon} onClick={() => {}}>
                  Añadir clip
                </IconButton>
              </div>
            </div>
          </TrackContainer>
        ))}
      </div>
    </Layout>
  );
}

export default RemixShowPage;
