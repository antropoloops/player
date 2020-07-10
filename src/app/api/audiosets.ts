import ky from "ky";
import { Audioset } from "../../audioset";

const API_URL = `https://play-admin.antropoloops.com/api/1.0/index`;

type GetAudioset = {
  path: string;
};
export async function getAudioset({ path }: GetAudioset): Promise<Audioset> {
  const url = `${API_URL}/${path}`;
  const data = (await ky.get(url).json()) as any;
  return data;
}
