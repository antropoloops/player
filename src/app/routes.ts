const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/`,
  set: (id: string) => `/set/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyecto/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  testSet: () => `/test`,
  topics: () => `/topics`,
  topic: (id: string) => `/topic/${id}`,
};

export default routes;
