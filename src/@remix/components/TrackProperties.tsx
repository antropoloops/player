import React from "react";
import { PropertyList } from "../../@core/components";
import { Track } from "../../@backend/datastore";

type Props = {
  className?: string;
  track: Track;
};

export default function TrackProperties({ className, track }: Props) {
  const data = {
    ...track.meta,
    updatedAt: track.updatedAt,
    createdAt: track.createdAt,
  };
  return (
    <PropertyList
      className={className}
      keys={["name", "color", "position", "volume", "createdAt", "updatedAt"]}
      labels={{}}
      values={data}
    />
  );
}
