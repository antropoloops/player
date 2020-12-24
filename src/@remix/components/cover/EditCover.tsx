import React, { useEffect, useRef, useState } from "react";
import { DesktopView } from "../../../@core/components";
import { Group, Media, Project, Clip, ImageCrop } from "../../../models";
import { useObserveModel } from "../../../@backend/hooks/useObserveModel";
import { useStorageImage } from "../../../@backend/hooks/useStorage";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { EmptyImages } from "../../helpers/imageHelpers";
import ActionButton from "../shared/ActionButton";
import { CloseIcon, DoneIcon } from "../../../components/icons/Icons";
import ActionLink from "../shared/ActionLink";
import routes from "../../../routes";
import { cropImage, imageUploader } from "../../services/imageUploader";
import { DataStore } from "aws-amplify";
import { useHistory } from "react-router-dom";

type Props = {
  group: Group;
  remix: Project;
  clipId?: string;
};

const getCrop = (crop?: ImageCrop): Crop | undefined => ({
  aspect: 1,
  x: crop?.x || 0,
  y: crop?.y || 0,
  width: crop?.width || 300,
  height: crop?.height || 300,
  unit: "px",
});

export default function EditCover({ group, remix, clipId }: Props) {
  const history = useHistory();
  const { data: clip } = useObserveModel(Clip, clipId);
  const { image } = useStorageImage(clip?.image?.original.file?.key);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>();

  useEffect(() => {
    if (clip) {
      setCrop(getCrop(clip.image?.current.crop));
    }
  }, [clip]);

  const saveCrop = async () => {
    if (!imageRef.current || !clip || !crop) return;

    const upload = imageUploader(group, remix);
    const file = await cropImage(
      imageRef.current,
      crop,
      clip.image?.current.file?.fileName || ""
    );
    if (!file) return;

    const newMedia = await upload(file);
    const saved = await DataStore.save(
      Clip.copyOf(clip, (draft) => {
        if (!draft.image) return;

        draft.image.current = {
          file: newMedia.file,
          crop: {
            width: crop.width,
            height: crop.height,
          },
        };
      })
    );
    return saved;
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
            saveCrop().then(() => {
              history.push(routes.remixClip(remix.id, clipId || ""));
            });
          }}
        >
          Guardar
        </ActionButton>
        <ActionLink
          icon={CloseIcon}
          to={routes.remixClip(remix.id, clipId || "")}
        >
          Cancelar
        </ActionLink>
      </div>
      {/* <pre className="text-sm">{JSON.stringify(crop, null, 2)}</pre>
      <pre className="text-sm">{JSON.stringify(clip, null, 2)}</pre> */}
    </DesktopView>
  );
}
