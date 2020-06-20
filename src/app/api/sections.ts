import routes from "../routes";

export type Section = {
  id: string;
  image_url: string;
  home?: boolean;
  path?: string;
  url?: string;
};

const SECTIONS: Section[] = [
  {
    id: "home",
    image_url: "/images/sections/home.jpg",
    path: routes.root(),
  },
  {
    id: "projects",
    image_url: "/images/sections/projects.jpg",
    path: routes.sets(),
    home: true,
  },
  {
    id: "topics",
    image_url: "/images/sections/topics.jpg",
    path: routes.topics(),
    home: true,
  },
  {
    id: "guides",
    image_url: "/images/sections/guides.jpg",
    path: routes.guides(),
    home: true,
  },
  {
    id: "blog",
    image_url: "/images/sections/home.jpg",
    url: "https://talleresantropoloops.tumblr.com/",
  },
  {
    id: "info",
    image_url: "/images/sections/info.jpg",
    path: routes.about(),
  },
];

export async function listSections(): Promise<Section[]> {
  return SECTIONS;
}

export async function getSection(id: string): Promise<Section | undefined> {
  return SECTIONS.find((section) => section.id === id);
}
