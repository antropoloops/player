import React from "react";
import { useListRemixSamplesQuery } from "../../@offline/hooks/useOfflineQueries";
import { IconButton } from "../../components/shared/IconButton";
import { Group, Remix } from "../../models";

type Props = {
  className?: string;
  group: Group;
  remix: Remix;
};

export function SampleGallery({ className, group, remix }: Props) {
  const { data: samples } = useListRemixSamplesQuery(group.id, remix.id);

  console.log("SAMPLES", samples);
  return (
    <div className={className}>
      <div>
        <IconButton>Add file</IconButton>
      </div>
    </div>
  );
}
