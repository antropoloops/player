const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/sets`,
  set: (id: string) => `/sets/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyecto/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  player: (id: string) => `/play/${id}`,
  testSet: () => `/test`,
  topics: () => `/temas`,
  topic: (id: string) => `/temas/${id}`,
  guides: () => `/guias`,
};

export default routes;
