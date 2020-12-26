import { v4 as uuid } from "uuid";
import { encode } from "blurhash";
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
    const url = URL.createObjectURL(file);
    const image = await loadImage(url);
    const thumbnail = await encodeImageToBlurhash(image);

    const media = await DataStore.save(
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
          width: image.width,
          height: image.height,
          thumbnail,
        },
      })
    );
    return media;
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

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error: any) => reject(error);
    img.src = src;
  });
}

function getImageData(image: HTMLImageElement): ImageData | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
}

async function encodeImageToBlurhash(image: HTMLImageElement): Promise<string> {
  const imageData = getImageData(image);
  if (!imageData) {
    return "";
  }

  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
}
