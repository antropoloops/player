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
  remixEdit: (id: string) => `/remezcla/${id}/editar`,
  remixTrack: (remixId: string, trackId: string) =>
    `/remezcla/${remixId}/pista/${trackId}`,
  remixClip: (remixId: string, clipId: string) =>
    `/remezcla/${remixId}/clip/${clipId}`,
  remixCover: (remixId: string) => `/remezcla/${remixId}/portada`,
  remixClipAudio: (remixId: string, clipId: string) =>
    `/remezcla/${remixId}/clip/${clipId}/audio`,
  remixClipCover: (remixId: string, clipId: string) =>
    `/remezcla/${remixId}/clip/${clipId}/portada`,

  remixPlay: (id: string) => `/remezcla/play/${id}`,

  sounds: () => `/sonidos`,
  sound: (id: string) => `/sonidos/${id}`,
  soundEdit: (id: string) => `/sonidos/editar/${id}`,

  admin: () => `/admin`,
  adminDebug: () => `/admin/debug`,
  adminLogin: () => `/admin/entrar`,
  adminLogout: () => `/admin/salir`,
  adminLoginGroup: (id: string) => `/admin/entrar/grupo/${id}`,
  // private?
  adminGroups: () => `/admin/_groups`,
  adminGroup: (id: string) => `/admin/_groups/${id}`,
};

export default routes;
