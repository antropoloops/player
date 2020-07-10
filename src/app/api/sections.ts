import routes from "../routes";

export type Section = {
  id: string;
  image_url: string;
  home?: boolean;
  to: string;
  external?: boolean;
};

const SECTIONS: Section[] = [
  {
    id: "home",
    image_url: "/images/sections/home.jpg",
    to: routes.root(),
  },
  {
    id: "projects",
    image_url: "/images/sections/projects.jpg",
    to: routes.sets(),
    home: true,
  },
  {
    id: "topics",
    image_url: "/images/sections/topics.jpg",
    to: routes.topics(),
    home: true,
  },
  {
    id: "guides",
    image_url: "/images/sections/guides.jpg",
    to: routes.guides(),
    home: true,
  },
  {
    id: "blog",
    image_url: "/images/sections/home.jpg",
    external: true,
    to: "https://talleresantropoloops.tumblr.com/",
  },
  {
    id: "info",
    image_url: "/images/sections/info.jpg",
    to: routes.about(),
  },
];

export async function listSections(): Promise<Section[]> {
  return SECTIONS;
}

export async function getSection(id: string): Promise<Section | undefined> {
  return SECTIONS.find((section) => section.id === id);
}
