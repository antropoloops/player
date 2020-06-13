import ky from "ky";
import { API_URL } from "../config";
import { Audioset } from "../../audioset";

type GetAudioset = {
  path: string;
};
export async function getAudioset({ path }: GetAudioset): Promise<Audioset> {
  const url = `${API_URL}/${path}`;
  const data = (await ky.get(url).json()) as any;
  return data;
}
