import React, { useState } from "react";
import { DesktopView } from "../../../@core/components";
import { Group, Media, Project, Clip } from "../../../models";
import { useObserveModel } from "../../../@backend/hooks/useObserveModel";
import { useStorageImage } from "../../../@backend/hooks/useStorage";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { EmptyImages } from "../../helpers/imageHelpers";

type Props = {
  group: Group;
  remix: Project;
  clipId?: string;
};

export default function EditCover({ group, remix, clipId }: Props) {
  const aspect = 1; // 16 / 9
  const [crop, setCrop] = useState<Crop>({ aspect });
  const { data: clip } = useObserveModel(Clip, clipId);
  const key = clip?.imageFile?.key;
  const { image } = useStorageImage(key);

  return (
    <DesktopView>
      <ReactCrop
        src={image?.src || EmptyImages.lighter}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
      />
    </DesktopView>
  );
}
