import React from "react";
import { Group, Remix, Track } from "../../../@offline/datastore";
import { DesktopView, Heading } from "../../../@core/components";

type Props = {
  group: Group;
  remix: Remix;
  track: Track;
};

export function TrackEditor({ remix, group, track }: Props) {
  return (
    <DesktopView>
      <Heading level={1}>{track.meta.name}</Heading>
    </DesktopView>
  );
}
