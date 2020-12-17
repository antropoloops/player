import React from "react";
import { Group, Project } from "../../@offline/datastore";
import { DesktopView, Heading } from "../../@core/components";
import { RemixProperties } from "./RemixProperties";
import { SampleGallery } from "./SampleGallery";

type Props = {
  group: Group;
  remix: Project;
};

export function ShowRemix({ remix, group }: Props) {
  return (
    <DesktopView>
      <Heading level={1}>{remix.meta.title}</Heading>
      <RemixProperties meta={remix.remix} />
      <SampleGallery group={group} project={remix}></SampleGallery>
    </DesktopView>
  );
}
