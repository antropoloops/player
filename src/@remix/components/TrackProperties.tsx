import React from "react";
import { PropertyList } from "../../@core/components";
import { Track } from "../../@backend/datastore";

type Props = {
  className?: string;
  track: Track;
};

export default function TrackProperties({ className, track }: Props) {
  return (
    <PropertyList
      className={className}
      keys={["name", "color", "position", "volume"]}
      labels={{}}
      values={track.meta}
    />
  );
}
