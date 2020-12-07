const routes = {
  root: () => `/`,
  about: () => `/about`,
  sets: () => `/sets`,
  set: (id: string) => `/sets/${id}`,
  community: () => `/comunidad`,
  explore: (id: string) => `/explorar/${id}`,
  projects: () => `/proyectos`,
  project: (id: string) => `/proyectos/${id}`,
  readme: (id: string) => `/comunidad/${id}`,
  audioset: (id: string) => `/audioset/${id}`,
  player: (id: string) => `/play-next/${id}`,
  testSet: () => `/test`,
  topics: () => `/documentacion`,
  topic: (id: string) => `/documentacion/${id}`,
  guides: () => `/guias`,
  guide: (id: string) => `/guias/${id}`,
  file: (id: string) => `/ficheros/${id}`,

  archives: () => `/archivo`,
  archive: (id: string) => `/archivo/${id}`,
  archiveOffline: () => `/archivo/offline`,
  archiveOfflineMedia: (id: string) => `/archivo/offline/${id}`,
};

export default routes;
