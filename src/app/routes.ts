const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/`,
  set: (id: string) => `/set/${id}`,
  testSet: () => `/test`,
};

export default routes;
