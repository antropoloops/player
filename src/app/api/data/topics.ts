export const GROUPS = [
  {
    id: "1",
    title: "Play",
    image_url: "https://i.picsum.photos/id/1/900/600.jpg",
    path: "play",
  },
  {
    id: "2",
    title: "Loops",
    image_url: "https://i.picsum.photos/id/2/900/600.jpg",
    path: "loops",
  },
  {
    id: "3",
    title: "Mapas",
    image_url: "https://i.picsum.photos/id/3/900/600.jpg",
    path: "maps",
  },
];

const TOPICS_BASE = [
  {
    id: "1",
    title: "¿Qué es play.antropoloops?",
    image_url: "https://i.picsum.photos/id/10/900/600.jpg",
    path: "que-es",
  },
  {
    id: "2",
    title: "Edicación musical intercultural y remezcla",
    image_url: "https://i.picsum.photos/id/11/900/600.jpg",
    path: "educacion-musical",
  },
  {
    id: "3",
    title: "De Sanjomix a toda la galaxia / tercer ciclo primaria",
    image_url: "https://i.picsum.photos/id/12/900/600.jpg",
    path: "sanjomix",
  },
  {
    id: "4",
    title: "Las músicas tradicionales en el aula / juego y patrimonio",
    image_url: "https://i.picsum.photos/id/13/900/600.jpg",
    path: "musicas-tradicionales",
  },
  {
    id: "5",
    title: "Remezcla, diversidad e identidad",
    image_url: "https://i.picsum.photos/id/14/900/600.jpg",
    path: "remezcla-diversidad-identidad",
  },
  {
    id: "6",
    title: "Cacharreo en el aula / interfaces musicales especiales",
    image_url: "https://i.picsum.photos/id/15/900/600.jpg",
    path: "cacharreo",
  },
];

export const TOPICS = GROUPS.map((group) =>
  TOPICS_BASE.map((topic, i) => ({
    id: group.id + "-" + i,
    title: `${topic.title}`,
    path: `${group.path}-${topic.path}`,
    groupId: group.id,
  }))
).flat();
