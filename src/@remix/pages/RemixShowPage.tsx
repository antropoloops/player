import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@offline/hooks/useCurrentGroup";
import {
  useGetRemixQuery,
  useListRemixTracksQuery,
} from "../../@offline/hooks/useOfflineQueries";
import { createTrack } from "../../@offline/service";
import BackToLink from "../../components/BackToLink";
import { AddIcon, PlayCircleIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import LoadingScreen from "../../components/LoadingScreen";
import IconLink from "../../components/shared/IconLink";
import routes from "../../routes";
import IconButtonBig from "../components/shared/Buttons";
import { ShowRemix } from "../components/ShowRemix";
import TrackContainer from "../../components/simple-player/TrackContainer";
import { IconButton } from "../../components/shared/IconButton";
import { TrackEditor } from "../components/RemixEditor";
import { Track } from "../../models";

type Props = {
  className?: string;
};

export function RemixShowPage({ className }: Props) {
  const params = useParams<{ id: string }>();
  const group = useCurrentGroup();

  const { data: remix } = useGetRemixQuery(params.id, group?.id);
  const { data: tracks, refetch: refetchTracks } = useListRemixTracksQuery(
    params.id
  );
  const [track, setTrack] = useState<Track | undefined>();

  if (!group || !remix || !tracks) return <LoadingScreen />;

  const editor = track ? (
    <TrackEditor group={group} remix={remix} track={track} />
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
              setTrack(track);
              refetchTracks();
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
              setTrack(track);
            }}
          >
            <div className="w-full bg-gray-dark">
              <div className="bg-gray-medium bg-opacity-50">
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
                <IconButton
                  icon={AddIcon}
                  onClick={() => {
                    track.clips?.push({
                      sampleID: "",
                    });
                  }}
                >
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
