import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../shared/Header";
import { Markdown } from "../shared/Markdown";
import { Scroll } from "../shared/Scroll";

const VERSION = "3.3.0";
const BODY = `
<h1>Antropoloops Player</h1>
<p>Versión ${VERSION}</p>
<p>
Antropoloops Player es una herramienta
desarrollada dentro del contexto de los
<a href="https://talleres.antropoloops.com">Talleres Antropoloops</a>
</p>
<p>
Ha sido desarrollada gracias a la financiación de
<a href="https://www.fondationcarasso.org/es/">
<img src="/carasso.jpg" alt="Fundación Caraso">
</a>
</p>
<p>¡Muchas gracias!</p>

<p>
Tanto el
<a href="https://github.com/antropoloops/player">
código fuente
</a>
 como los contenidos están publicados con licencias libres.
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
