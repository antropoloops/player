import { COSMIC_KEY } from "../config";
import ky from "ky";
import { Page } from "./pages";

const PROPS = "slug,title,content,metadata";
const URL = "https://api.cosmicjs.com/v1/playantropoloops";

const GROUPS = ["sanjomix-2017-20"];

export const getGuideUrl = (slug: string) =>
  `${URL}/object/${slug}?pretty=true&hide_metafields=true&read_key=${COSMIC_KEY}&props=${PROPS}`;

export const listGuidesUrl = () =>
  `${URL}/objects/?hide_metafields=true&read_key=${COSMIC_KEY}&type=guias&props=slug,title,metadata,`;

export type Guide = Page & {
  metadata: {
    pdf: {
      url: string;
    };
    subtitle?: string;
    proyecto: string;
    position: number;
  };
};

export type GroupedGuides = {
  locale: string;
  groups: {
    id: string;
    guides: Guide[];
  }[];
};

export async function listGuides(): Promise<GroupedGuides> {
  const data = await ky.get(listGuidesUrl()).json();
  if (!data) throw Error("Not found");

  const guides = (data as any).objects as Guide[];
  const byPosition = (a: Guide, b: Guide) =>
    a.metadata.position - b.metadata.position;

  return {
    locale: "es",
    groups: GROUPS.map((proyecto) => ({
      id: proyecto,
      guides: guides
        .filter((t) => t.metadata.proyecto === proyecto)
        .sort(byPosition),
    })),
  };
}

export async function getGuide({ path }: { path: string }): Promise<Guide> {
  const data = await ky.get(getGuideUrl(path)).json();
  if (!data) throw Error("Not found");

  return (data as any).object as Guide;
}
