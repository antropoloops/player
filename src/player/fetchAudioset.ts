import { AudiosetData, createAudioset } from "../audioset";

const getUrl = (id: string) =>
  `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/${id}.audioset.json`;

export function fetchAudioset(id: string): Promise<AudiosetData> {
  return fetch(getUrl(id))
    .then(r => r.json())
    .then(createAudioset);
}
