import routes from "../../routes";

export type Section = {
  id: string;
  image_url: string;
  home?: boolean;
  to: string;
  external?: boolean;
};

export function listSections() {
  return SECTIONS;
}

export function getSection(id: string) {
  return SECTIONS.find((section) => section.id === id) as Section;
}

export const SECTIONS: Section[] = [
  {
    id: "home",
    image_url: "/images/sections/home.jpg",
    to: routes.root(),
  },
  {
    id: "projects",
    image_url: "/images/sections/projects.jpg",
    to: routes.projects(),
    home: true,
  },
  {
    id: "community",
    image_url: "/images/sections/community.jpg",
    to: routes.community(),
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
