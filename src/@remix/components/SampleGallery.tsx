import React from "react";
import { IconButton } from "../../components/shared/IconButton";
import { Group, Project } from "../../models";

type Props = {
  className?: string;
  group: Group;
  project: Project;
};

export function SampleGallery({ className, group, project }: Props) {
  return (
    <div className={className}>
      <div>
        <IconButton>Add file</IconButton>
      </div>
    </div>
  );
}
