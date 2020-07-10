import { COSMIC_KEY } from "../config";
import ky from "ky";

const PROPS = "slug,title,content,metadata,";
const URL = "https://api.cosmicjs.com/v1/playantropoloops";

export const cosmicUrl = (slug: string) =>
  `${URL}/object/${slug}?pretty=true&hide_metafields=true&read_key=${COSMIC_KEY}&props=${PROPS}
  `;

export type Page = {
  slug: string;
  title: string;
  content: string;
};

type GetPage = {
  slug: string;
  locale?: string;
};

export async function getPage({ slug }: GetPage): Promise<Page> {
  const data = await ky.get(cosmicUrl(slug)).json();
  if (!data) throw Error("Not found");

  const page = (data as any).object as Page;
  return page;
}
