import { AudiosetData, createAudioset } from "../audioset";

const getUrl = (idOrUrl: string) =>
  idOrUrl.endsWith(".json")
    ? idOrUrl
    : `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/${idOrUrl}.audioset.json`;

export function fetchAudioset(idOrUrl: string): Promise<AudiosetData> {
  return fetch(getUrl(idOrUrl))
    .then(r => r.json())
    .then(createAudioset);
}
