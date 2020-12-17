import React from "react";
import { Group, Remix } from "../../@offline/datastore";
import { DesktopView, Heading } from "../../@core/components";
import { RemixProperties } from "./RemixProperties";
import { SampleGallery } from "./SampleGallery";

type Props = {
  group: Group;
  remix: Remix;
};

export function ShowRemix({ remix, group }: Props) {
  return (
    <DesktopView>
      <Heading level={1}>{remix.meta.title}</Heading>
      <RemixProperties meta={remix.meta} />
      <SampleGallery group={group} remix={remix}></SampleGallery>
    </DesktopView>
  );
}
