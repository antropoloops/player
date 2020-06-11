const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/`,
  set: (id: string) => `/set/${id}`,
  testSet: () => `/test`,
  topics: () => `/topics`,
  topic: (id: string) => `/topic/${id}`,
};

export default routes;
