import { Bundle, createAudioset } from "../../audioset";

const PRODUCTION = `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/`;
const HOST = PRODUCTION;

const getUrl = (idOrUrl: string) =>
  idOrUrl.endsWith(".json") ? idOrUrl : `${HOST}/${idOrUrl}.audioset.json`;

export function fetchAudioset(idOrUrl: string): Promise<Bundle> {
  return fetch(getUrl(idOrUrl))
    .then(r => r.json())
    .then(createAudioset);
}
