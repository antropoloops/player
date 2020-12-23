import { v4 as uuid } from "uuid";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import { Group, Media, Project, MediaType } from "../../@backend/datastore";
import { Crop } from "react-image-crop";

export function imageUploader(group: Group, project: Project) {
  const uploadFile = async (file: File) => {
    const result: any = await Storage.put(
      `${group.id}/${project.id}/${uuid()}`,
      file
    );
    const image = await DataStore.save(
      new Media({
        type: MediaType.IMAGE,
        groupID: group.id,
        projectID: project.id,
        meta: {
          title: file.name,
        },
        file: {
          key: result.key,
          mimeType: file.type,
          fileName: file.name,
          fileSize: file.size,
        },
      })
    );
    return image;
  };

  return uploadFile;
}

export function cropImage(
  image: HTMLImageElement,
  crop: Crop,
  fileName: string
): Promise<File | null> {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const width = crop.width || 0;
  const height = crop.height || 0;
  const x = crop.x || 0;
  const y = crop.y || 0;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return Promise.resolve(null);
  }

  ctx.drawImage(
    image,
    x * scaleX,
    y * scaleY,
    width * scaleX,
    height * scaleY,
    0,
    0,
    width,
    height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        const file = blob && new File([blob], fileName);
        resolve(file);
      },
      "image/jpeg",
      1
    );
  });
}
