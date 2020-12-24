import React from "react";
import routes from "../../../routes";
import { Project, Clip, Track } from "../../../models";
import { Waveform } from "../../../@sounds/components/Waveform";
import MediaObject from "../../../components/MediaObject";
import { useStorageImage } from "../../../@backend/hooks/useStorage";

type Props = {
  className?: string;
  remix: Project;
  clip: Clip;
  track: Track;
};

export default function ClipItem({ className, remix, clip, track }: Props) {
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
