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
  archiveRecording: (id: string, recordingId: string) =>
    `/archivo/${id}/r/${recordingId}`,
  archiveRelations: () => `/archivo/:id/:type/:childId`,

  // deprecated
  archiveOffline: () => `/archivo/offline`,
  archiveOfflineMedia: (id: string) => `/archivo/offline/${id}`,

  remixes: () => `/remezcla`,
  remixNew: () => `/remezcla/nuevo`,
  remix: (id: string) => `/remezcla/${id}`,
  remixTrack: (id: string, trackId: string) =>
    `/remezcla/editar/${id}/t/${trackId}`,
  remixClip: (id: string, selectionId: string) =>
    `/remezcla/editar/${id}/c/${selectionId}`,

  remixRelation: (id: string, item: string, childId: string) =>
    `/remezcla/editar/${id}/${item}/${childId}`,
  remixPlay: (id: string) => `/remezcla/play/${id}`,
  remixEdit: (id: string) => `/remezcla/old/${id}`,
  remixEditItem: (id: string, item: string) => `/remezcla/editar/${id}/${item}`,
  remixEditItemChild: (id: string, item: string, childId: string) =>
    `/remezcla/editar/${id}/${item}/${childId}`,
  remixLoginGroup: (id: string) => `/remezcla/entrar/${id}`,

  sounds: () => `/sonidos`,
  sound: (id: string) => `/sonidos/${id}`,
  soundEdit: (id: string) => `/sonidos/editar/${id}`,

  admin: () => `/admin`,
  adminDebug: () => `/admin/debug`,
  adminLogin: () => `/admin/entrar`,
  adminLogout: () => `/admin/salir`,
  // private?
  adminGroups: () => `/admin/_groups`,
  adminGroup: (id: string) => `/admin/_groups/${id}`,
};

export default routes;
