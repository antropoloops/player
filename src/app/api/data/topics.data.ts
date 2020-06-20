import { Topic } from "../topics";

const README = `
<p>Durante el segundo trimestre del curso 2018-19 en el CEIP San José Obrero, el alumnado de 5º trajo a clase las canciones que habían elegido para sus historias de vida musicales. Usando fragmentos de estas canciones preparamos dos sets musicales y durante el tercer trimestre estuvieron componiendo sus propias piezas de remezcla. Estos son los sets que utilizamos.</p>
<p>Aquí podéis ver un video sobre las historias de vida musicales del alumnado de 5º del año anterior (curso 2017-18)</p><div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/268642651?title=0&amp;byline=0&amp;portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<p>Tras el primer intercambio con alumnado de Polonia a través del sonido, durante el segundo trimestre tuvimos la oportunidad desarrollar otro intercambio con un colegio de Estambul, cuyo alumnado de 4º recopiló sus historias de vida musicales para cruzarlas con las nuestras. La idea era mandar las historias de vida musicales inicialmente incompletas, solo una foto y una canción, para que los otros tuvieran que imaginar qué historia había detrás de esa canción y esa imagen. Lo veíamos como una oportunidad para que el alumnado se acerque a otros niños y niñas de otro contexto cultural a través de sus memorias musicales.</p>
`;

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
    path: "que-es-playantropoloops",
  },
  {
    id: "2",
    title: "Edicación musical intercultural y remezcla",
    image_url: "https://i.picsum.photos/id/11/900/600.jpg",
    path: "educacion-musical-intercultural",
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

export const TOPICS: Topic[] = GROUPS.map((group) =>
  TOPICS_BASE.map((topic, i) => ({
    id: group.id + "-" + i,
    title: `${topic.title}`,
    path: topic.path,
    readme: README,
    group: {
      id: group.id,
      title: group.title,
    },
  }))
).flat();
