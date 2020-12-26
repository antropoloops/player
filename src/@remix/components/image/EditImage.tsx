import React, { useEffect, useRef, useState } from "react";
import { DesktopView } from "../../../@core/components";
import {
  Group,
  Project,
  ImageCrop,
  EditableImage,
  EditedImage,
} from "../../../models";
import { useStorageImage } from "../../../@backend/hooks/useStorage";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { EmptyImages } from "../../helpers/imageHelpers";
import ActionButton from "../shared/ActionButton";
import { CloseIcon, DoneIcon } from "../../../components/icons/Icons";
import ActionLink from "../shared/ActionLink";
import { cropImage, imageUploader } from "../../services/imageUploader";
import { useHistory } from "react-router-dom";

type Props = {
  group: Group;
  remix: Project;
  backTo: string;
  editableImage?: EditableImage;
  saveImage: (image: EditedImage) => Promise<any>;
  aspect?: number;
};

const getCrop = (aspect: number, crop?: ImageCrop): Crop | undefined => ({
  aspect,
  x: crop?.x || 0,
  y: crop?.y || 0,
  width: crop?.width || 300,
  height: crop?.height || 300 / aspect,
  unit: "px",
});

export default function EditCover({
  group,
  remix,
  backTo,
  editableImage,
  saveImage,
  aspect = 1,
}: Props) {
  const history = useHistory();
  const { image } = useStorageImage(editableImage?.original.file?.key);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>(
    getCrop(aspect, editableImage?.current.crop)
  );

  useEffect(() => {
    if (editableImage?.current.crop) {
      setCrop(getCrop(aspect, editableImage?.current.crop));
    }
  }, [editableImage, aspect]);

  const createCrop = async () => {
    if (!imageRef.current || !crop) return;

    const upload = imageUploader(group, remix);
    const fileName = editableImage?.current.file?.fileName || "";
    const file = await cropImage(imageRef.current, crop, fileName);
    if (!file) return;

    const newMedia = await upload(file);

    return await saveImage({
      file: newMedia.file,
      crop,
    });
  };

  return (
    <DesktopView>
      {crop && (
        <ReactCrop
          src={image?.src || EmptyImages.lighter}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onImageLoaded={(image) => {
            imageRef.current = image;
          }}
          crossorigin="anonymous"
        />
      )}
      <div className="flex py-4">
        <ActionButton
          icon={DoneIcon}
          onClick={() => {
            createCrop().then(() => {
              history.push(backTo);
            });
          }}
        >
          Guardar
        </ActionButton>
        <ActionLink icon={CloseIcon} to={backTo}>
          Cancelar
        </ActionLink>
      </div>
      {/* <pre className="text-sm">{JSON.stringify(crop, null, 2)}</pre>
      <pre className="text-sm">{JSON.stringify(clip, null, 2)}</pre> */}
    </DesktopView>
  );
}
