import React from "react";
import PreviewAudio from "../../../@archive/components/PreviewAudio";
import { safeFindClipById, safeFindTrackById } from "../../../audioset";
import routes from "../../../routes";
import { mutateClip } from "../../helpers/immutableHelpers";
import { useStorageImage } from "../../hooks/useStorage";
import EditLink from "../inline/EditLink";
import InlineEdit from "../inline/InlineEdit";
import ImagePlaceholder from "../shared/ImagePlaceholder";
import { EditorProps } from "./Editor";

const EditClip: React.FC<EditorProps> = ({ audioset, id, onChange }) => {
  const clip = safeFindClipById(audioset, id);
  const { image } = useStorageImage(clip?.resources.cover.small);

  if (!clip) return <div>Algo ha ido mal...</div>;

  const track = safeFindTrackById(audioset, clip.trackId);

  const audioStorage = clip.resources.audio.storage;

  return (
    <div className="text-white">
      <div className="max-w-sm overflow-hidden"></div>
      <div className="flex my-2">
        <h3
          className="px-4 py-1 rounded-full"
          style={{ backgroundColor: track.color }}
        >
          {track.name}
        </h3>
      </div>
      <InlineEdit
        value={clip.name}
        render={(value) => <h1 className="text-4xl">{value}</h1>}
        onChange={(value) => {
          onChange(
            mutateClip(audioset, clip.id, (clip) => {
              clip.name = value;
            })
          );
        }}
      />
      <div className="mt-4">
        <div className="flex">
          <h2 className="font-medium">Imágen</h2>
          <EditLink
            to={routes.remixEditItemChild(audioset.id, "clip-image", clip.id)}
          />
        </div>
        {image ? (
          <img className="max-w-sm" src={image.src} alt="" />
        ) : (
          <ImagePlaceholder
            className="max-w-sm opacity-75"
            ratio="square"
            color={clip.color}
          />
        )}
      </div>
      <div className="mt-4">
        <div className="flex">
          <h2 className="font-medium">Sonido</h2>
          <EditLink
            to={routes.remixEditItemChild(audioset.id, "clip-audio", clip.id)}
          />
        </div>
        <PreviewAudio storage={audioStorage} color={track.color} />
      </div>
      {/* <pre>{JSON.stringify(clip, null, 2)}</pre> */}
    </div>
  );
};
export default EditClip;
