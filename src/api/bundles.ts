// eslint-disable no-unused-vars
import { Bundle, createAudioset } from "../audioset";
import { AUDIOSET_API } from "../config";

const S3 = `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files`;
const ADMIN = `https://play-admin.antropoloops.com/api/1.0/index`;

const getS3Url = (idOrUrl: string) =>
  idOrUrl.endsWith(".json") ? idOrUrl : `${S3}/${idOrUrl}.audioset.json`;

const dbServerUrl = (idOrUrl: string) =>
  idOrUrl === "index"
    ? `http://localhost:1234/index`
    : `http://localhost:1234/set/${idOrUrl}`;

const getAdminUrl = (idOrUrl: string) =>
  idOrUrl.endsWith(".json")
    ? idOrUrl
    : idOrUrl === "index"
    ? ADMIN
    : `${ADMIN}/${idOrUrl}`;

// const getUrl = getProductionUrl; // dbServerUrl;
const getUrl =
  AUDIOSET_API === "s3"
    ? getS3Url
    : AUDIOSET_API === "local"
    ? dbServerUrl
    : getAdminUrl;

type GetBundle = {
  path: string;
  url?: string;
};
export function getBundle({ url, path }: GetBundle): Promise<Bundle> {
  return fetch(url || getUrl(path))
    .then((r) => r.json())
    .then(createAudioset);
}
