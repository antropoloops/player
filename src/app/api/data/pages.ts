import { Page } from "../types";

export const PAGE = `
<p>Tras el primer intercambio con alumnado de Polonia a través del sonido, durante el segundo trimestre tuvimos la oportunidad desarrollar otro intercambio con un colegio de Estambul, cuyo alumnado de 4º recopiló sus historias de vida musicales para cruzarlas con las nuestras. La idea era mandar las historias de vida musicales inicialmente incompletas, solo una foto y una canción, para que los otros tuvieran que imaginar qué historia había detrás de esa canción y esa imagen. Lo veíamos como una oportunidad para que el alumnado se acerque a otros niños y niñas de otro contexto cultural a través de sus memorias musicales.</p>
`;

export const PAGES: Page[] = [
  {
    id: "1",
    path: "topics",
    locale: "es",
    title: "Temas Antropoloops",
    image_url: "https://i.picsum.photos/id/300/900/600.jpg",
    summary: "<p>Esto es la introducción a los temas</p>",
    content: PAGE,
  },
];
