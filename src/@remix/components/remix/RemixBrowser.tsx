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
import { useStorageUrl } from "../../../@backend/hooks/useStorage";
import { Waveform } from "../../../@sounds/components/Waveform";
import MediaObject from "../../../components/MediaObject";
import { useStorageImage } from "../../../@backend/hooks/useStorage";

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

export default function RemixBrowser({
  className,
  remix,
  tracks,
  clips,
}: Props) {
  const params = useParams<Params>();
  const group = useCurrentGroup();
  const history = useHistory();
  const { url: coverUrl } = useStorageUrl(remix.image?.current.file?.key);

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
              history.push(routes.remixTrack(remix.id, track.id));
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

type ClipItemProps = {
  className?: string;
  remix: Project;
  clip: Clip;
  track: Track;
};

function ClipItem({ className, remix, clip, track }: ClipItemProps) {
  const thumbnail = clip.audio?.current.file?.thumbnail;
  const { image } = useStorageImage(clip.image?.current.file?.key);

  return (
    <MediaObject
      key={clip.id}
      alt={""}
      image={image?.src}
      margin=""
      imageSize="w-cover-mini"
      ratio="1:1"
      to={routes.remixClip(remix.id, clip.id)}
      style={{ backgroundColor: track.meta.color }}
    >
      <div className="mx-1 flex-grow">
        <div className="text-xs my-1 truncate">{clip.meta?.name}</div>
        <Waveform
          className="opacity-50"
          width={100}
          height={10}
          points={thumbnail || ""}
        />
      </div>
    </MediaObject>
  );
}
