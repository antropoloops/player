const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/sets`,
  set: (id: string) => `/sets/${id}`,
  explore: (id: string) => `/explorar/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyecto/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  player: (id: string) => `/play-next/${id}`,
  testSet: () => `/test`,
  topics: () => `/documentacion`,
  topic: (id: string) => `/documentacion/${id}`,
  guides: () => `/guias`,
  guide: (id: string) => `/guias/${id}`,
  file: (id: string) => `/ficheros/${id}`,
};

export default routes;
