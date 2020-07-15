const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/sets`,
  set: (id: string) => `/sets/${id}`,
  explore: (id: string) => `/explorar/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyecto/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  ribbonPlayer: (id: string) => `/next/player/${id}`,
  player: (id: string) => `/play/${id}`,
  testSet: () => `/test`,
  topics: () => `/temas`,
  topic: (id: string) => `/temas/${id}`,
  guides: () => `/guias`,
};

export default routes;
