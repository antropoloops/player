import React, { useState } from "react";
import { useStorageImage } from "../../hooks/useStorage";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  storageKey: string;
  aspect?: number;
};

const EditImage: React.FC<Props> = ({ storageKey, aspect = 16 / 9 }) => {
  const { image } = useStorageImage(storageKey);
  const [crop, setCrop] = useState<Crop>({ aspect });

  if (!image) return <div>Loading...</div>;

  return (
    <ReactCrop
      src={image.src}
      crop={crop}
      onChange={(newCrop) => setCrop(newCrop)}
    />
  );
};
export default EditImage;
