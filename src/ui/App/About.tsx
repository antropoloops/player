import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";
import { Scroll } from "../shared/Scroll";

const VERSION = "3.4.1";
const BODY = `
<p>Versión ${VERSION}</p>
<p>
play/antropoloops es una herramienta
desarrollada dentro del contexto de los
<a target="_blank" href="https://talleres.antropoloops.com">Talleres Antropoloops</a>
</p>
<p>
Hecha con ♥️ por <a target="_blank" href="https://github.com/danigb">danigb</a>
y <a target="_blank" href="https://github.com/mi-mina">mi-mina</a>
</p>
<p>
Y la financiación y apoyo   de
<a target="_blank" href="https://www.fondationcarasso.org/es/">
<img src="/carasso.jpg" alt="Fundación Caraso">
</a>
</p>
<p>¡Muchas gracias!</p>

<br>
<br>
<p>
El
<a target="_blank" href="https://github.com/antropoloops/player">
código fuente
</a>
 está publicado con licencia de código libre.
</p>
<br>

<p>
Para cualquier propuesta o comentario escríbenos a
<a href="mailto:talleres@antropoloops.com">talleres@antropoloops.com</a>
o
<a target="_blank" href="https://twitter.com/antropoloopsEDU">https://twitter.com/antropoloopsEDU</a>
</p>
`;

export const About = () => {
  return (
    <div className="App NotFound">
      <Header />
      <Scroll>
        <div className="content">
          <div className="inside">
            <Markdown markdown={BODY} />
            <Link to="/">Volver al inicio</Link>
          </div>
        </div>
      </Scroll>
    </div>
  );
};
