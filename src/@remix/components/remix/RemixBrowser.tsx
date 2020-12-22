import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCurrentGroup } from "../../../@backend/hooks/useCurrentGroup";
import BackToLink from "../../../components/BackToHeaderLink";
import { PlayCircleIcon } from "../../../components/icons/Icons";
import IconLink from "../../../components/shared/IconLink";
import routes from "../../../routes";
import TrackContainer from "../../../components/simple-player/TrackContainer";
import { Project, Selection, Track } from "../../../models";
import { Waveform } from "../../../@sounds/components/Waveform";
import MediaObject from "../../../components/MediaObject";

type Params = {
  id: string;
  type?: string;
  childId?: string;
};

type Props = {
  className?: string;
  remix: Project;
  tracks: Track[];
  clips: Selection[];
  covers: Selection[];
};

export function RemixShowPage({
  className,
  remix,
  tracks,
  clips,
  covers,
}: Props) {
  const params = useParams<Params>();
  const group = useCurrentGroup();
  const history = useHistory();

  const gotoTrack = (track: Track) =>
    history.push(routes.remixTrack(params.id, track.id));

  return (
    <div className={className}>
      <BackToLink to={routes.remixes()} label="Remezclas" />
      <Link to={routes.remix(params.id)}>
        <img src={"/images/gray-light.png"} alt="Remix" />
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
                    const thumbnail = clip.imageFile?.thumbnail;

                    return (
                      <MediaObject
                        key={clip.id}
                        alt={""}
                        margin=""
                        imageSize="w-cover-mini"
                        ratio="1:1"
                        to={routes.remixClip(params.id, clip.id)}
                        style={{ backgroundColor: track.meta.color }}
                      >
                        <div className="mx-1 flex-grow">
                          <div className="text-xs my-1 truncate">
                            {clip.meta?.title}
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
    </div>
  );
}

export default RemixShowPage;
