// eslint-disable no-unused-vars
import { Bundle, createAudioset } from "../../audioset";

const PRODUCTION = `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files`;
// const STAGING = `https://play-admin.antropoloops.com/api/1.0/index`;

const getProductionUrl = (idOrUrl: string) =>
  idOrUrl.endsWith(".json")
    ? idOrUrl
    : `${PRODUCTION}/${idOrUrl}.audioset.json`;

// const dbServerUrl = (idOrUrl: string) =>
//   idOrUrl === "index"
//     ? `http://localhost:1234/index`
//     : `http://localhost:1234/set/${idOrUrl}`;

// const getStaginUrl = (idOrUrl: string) =>
//   idOrUrl.endsWith(".json")
//     ? idOrUrl
//     : idOrUrl === "index"
//     ? STAGING
//     : `${STAGING}/${idOrUrl}`;

// const getUrl = getProductionUrl; // dbServerUrl;
const getUrl = getProductionUrl;

export function fetchAudioset(idOrUrl: string): Promise<Bundle> {
  return fetch(getUrl(idOrUrl))
    .then((r) => r.json())
    .then(createAudioset);
}
