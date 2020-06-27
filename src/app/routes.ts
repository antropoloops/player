const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/sets`,
  set: (id: string) => `/set/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyecto/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  player: (id: string) => `/play/${id}`,
  testSet: () => `/test`,
  topics: () => `/topics`,
  topic: (id: string) => `/topic/${id}`,
  guides: () => `/guides`,
};

export default routes;
