import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../../@backend/hooks/useCurrentGroup";
import BackToLink from "../../../components/BackToHeaderLink";
import { PlayCircleIcon } from "../../../components/icons/Icons";
import IconLink from "../../../components/shared/IconLink";
import routes from "../../../routes";
import TrackContainer from "../../../components/simple-player/TrackContainer";
import { Project, Clip, Track, Media } from "../../../models";
import { useObserveList } from "../../../@backend/hooks/useObserveModel";
import ClipItem from "./ClipItem";
import { useStorageUrl } from "../../../@backend/hooks/useStorage";

type Params = {
  id: string;
  type?: string;
  childId?: string;
};

type Props = {
  className?: string;
  remix: Project;
  tracks: Track[];
  clips: Clip[];
};

export function RemixShowPage({ className, remix, tracks, clips }: Props) {
  const params = useParams<Params>();
  const group = useCurrentGroup();
  const history = useHistory();
  const { data: files } = useObserveList(Media, remix.id, (t) =>
    t.projectID("eq", params.id)
  );
  const { url: coverUrl } = useStorageUrl(remix.image?.current.file?.key);

  const gotoTrack = (track: Track) =>
    history.push(routes.remixTrack(params.id, track.id));

  return (
    <div className={className}>
      <BackToLink to={routes.remixes()} label="Remezclas" />
      <Link className="relative ratio" to={routes.remix(params.id)}>
        <svg className="text-gray-darker" viewBox="0 0 16 9">
          <rect width="20" height="20" fill="currentColor" />
        </svg>
        {coverUrl ? (
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${coverUrl})` }}
          />
        ) : null}
      </Link>
      <h2 className="flex text-left p-1 bg-remixes text-bg-dark">
        <Link className="flex-grow" to={routes.remix(params.id)}>
          {remix?.meta.title || "..."}
          <span className="ml-4 text-xs">{group?.name}</span>
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
                {clips
                  .filter((s) => s.trackID === track.id)
                  .map((clip) => {
                    return (
                      <ClipItem
                        key={clip.id}
                        remix={remix}
                        track={track}
                        clip={clip}
                      />
                    );
                  })}
              </div>
            </div>
          </TrackContainer>
        ))}
      </div>
    </div>
  );
}

export default RemixShowPage;
