import ky from "ky";

const API_URL = `https://play-admin.antropoloops.com/api/1.0/index`;

type Meta = {
  id: string;
  type: "project" | "audioset";
  title: string;
  description: string;
  path: string;
  publish_path: string;
  parent_path: string;
  logo_url: string;
  readme: string;
};

export type Project = {
  id: string;
  meta: Meta;
  audiosets: Meta[];
};

type GetProject = {
  path: string;
};

export async function getProject({ path }: GetProject): Promise<Project> {
  const url = path ? `${API_URL}/${path}` : API_URL;
  const data = (await ky.get(url).json()) as any;
  return {
    id: data.id,
    meta: data.meta,
    audiosets: data.audiosets.map((audioset: any) => ({
      ...audioset,
      type: audioset.id[0] === "a" ? "audioset" : "project",
    })),
  };
}
