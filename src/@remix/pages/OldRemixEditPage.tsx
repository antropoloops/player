import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { IconButtonBig } from "../components/shared/Buttons";
import { useEditRemix } from "../hooks/useEditRemix";
import { getOfflineRemix, saveRemix } from "../offline";
import TrackContainer from "../../components/simple-player/TrackContainer";
import Clip from "../../components/simple-player/Clip";
import { IconButton } from "../../components/shared/IconButton";
import { PlayCircleIcon, AddIcon } from "../../components/icons/Icons";
import BackToLink from "../../components/BackToLink";
import routes from "../../routes";
import { addNewClip, addNewTrack } from "../helpers/immutableHelpers";
import { safeFindClipById } from "../../audioset";
import { useQuery } from "react-query";
import IconLink from "../../components/shared/IconLink";
import { useStorageImage } from "../hooks/useStorage";
import EditorConductor from "../components/old-edit/EditorConductor";

type EditParams = {
  id: string;
  type?: string;
  childId?: string;
};

type Props = {};

const RemixEditPage: React.FC<Props> = () => {
  const history = useHistory();
  const params = useParams<EditParams>();
  const [state, dispatch] = useEditRemix();
  const { data: remix } = useQuery(["offline-remix", params.id], () =>
    getOfflineRemix(params.id)
  );

  useEffect(() => {
    if (remix) dispatch({ type: "init", remix });
  }, [remix, dispatch]);

  useEffect(() => {
    if (state.audioset.id) {
      saveRemix({ id: state.audioset.id, audioset: state.audioset });
    }
  }, [state]);

  const audioset = state.audioset;

  const { image } = useStorageImage(audioset?.meta.logo_url);

  return (
    <Layout
      desktop={
        <div className="p-4">
          <EditorConductor
            audioset={audioset}
            type={params.type || ""}
            id={params.childId || ""}
            onChange={(audioset) => {
              dispatch({
                type: "audioset:update",
                audioset: audioset,
              });
            }}
          />
        </div>
      }
    >
      <BackToLink to={routes.remixes()} label="Remezclas" />
      <Link to={routes.remixEdit(params.id)}>
        <img src={image?.src || "/images/gray-light.png"} alt="Remix" />
      </Link>
      <h2 className="flex text-left p-1 mb-1 bg-pink-600 text-bg-dark">
        <Link className="flex-grow" to={routes.remixEdit(params.id)}>
          {audioset?.meta.title || "..."}
        </Link>
        <IconLink icon={PlayCircleIcon} to={routes.remixPlay(params.id)}>
          Play
        </IconLink>
      </h2>
      <div>
        <IconButtonBig
          icon={AddIcon}
          onClick={() => {
            dispatch({
              type: "audioset:update",
              audioset: addNewTrack(audioset),
            });
          }}
        >
          Añadir pista
        </IconButtonBig>
        {audioset.tracks.map((track) => (
          <TrackContainer
            key={track.id}
            track={track}
            status={{
              playing: false,
              time: 0,
            }}
            onStopTrack={() => undefined}
            onClick={() => {
              history.push(
                routes.remixEditItemChild(params.id, "track", track.id)
              );
            }}
          >
            <div className="w-full bg-gray-dark">
              <div className="bg-gray-medium bg-opacity-50">
                {track.clipIds.map((clipId) => (
                  <Clip
                    className="mb-micro last:mb-0"
                    key={clipId}
                    status={{ playing: false, time: 0 }}
                    clip={safeFindClipById(audioset, clipId)}
                    onClick={() => {
                      history.push(
                        routes.remixEditItemChild(params.id, "clip", clipId)
                      );
                    }}
                    isStream={false}
                    skipAudio
                  />
                ))}
              </div>
              <div className="flex p-1">
                <IconButton
                  icon={AddIcon}
                  onClick={() => {
                    dispatch({
                      type: "audioset:update",
                      audioset: addNewClip(audioset, track.id),
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
};
export default RemixEditPage;
