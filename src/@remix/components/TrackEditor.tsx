import React from "react";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import { Group, Media, Project, Track } from "../../@offline/datastore";
import { DesktopView, Heading } from "../../@core/components";
import { FilesInput } from "../../@archive/components/FilesInput";

type Props = {
  group: Group;
  remix: Project;
  track?: Track;
};

function uploader(project: Project, group: Group) {
  const uploadFile = async (file: File) => {
    const result = await Storage.put("test.txt", "Hello");
    console.log("Process", result);
    return "id";
  };

  return uploadFile;
}

export function TrackEditor({ remix, group, track }: Props) {
  if (!track) return null;

  return (
    <DesktopView>
      <Heading level={1}>{track.meta.name}</Heading>
      <FilesInput
        colors="bg-remixes text-black"
        onChange={(ids) => {
          console.log(ids);
        }}
        uploadFile={uploader(remix, group)}
      >
        Subir sonidos
      </FilesInput>
    </DesktopView>
  );
}
