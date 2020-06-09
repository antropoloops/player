import React from "react";
import { Markdown } from "../components/Markdown";
import Layout from "../components/Layout";
import { useDeviceType } from "../hooks/useDeviceType";
import { Link } from "react-router-dom";
import routes from "../routes";

const VERSION = "3.5.0";

const AboutPage = () => {
  const { isMobile } = useDeviceType();
  return (
    <Layout desktop={<img className="w-full" alt="team" src="/talleres.jpg" />}>
      {isMobile && <img alt="team" src="/talleres.jpg" />}
      <div className="p-4 text-white">
        <Markdown markdown={BODY} />
      </div>
      <div className="my-8 flex justify-center">
        <Link
          className="py-2 px-4 rounded-full bg-gray-light text-white"
          to={routes.root()}
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default AboutPage;

const BODY = `
<p>Versión ${VERSION}</p>
<p>
play/antropoloops es una herramienta
desarrollada dentro del contexto de los
<a target="_blank" href="https://talleres.antropoloops.com">Talleres Antropoloops</a>
</p>
<p>
Con ♥️ por:
<br>
diseño -
<a target="_blank" href="https://twitter.com/antropoloops">antropoloops</a>
<br>
programación -
<a target="_blank" href="https://github.com/danigb">danigb</a>
/
<a target="_blank" href="https://github.com/mi-mina">mi-mina</a>
</p>
<br>
<p>
Y la financiación y apoyo de
<a target="_blank" href="https://www.fondationcarasso.org/es/">
<img src="/carasso.jpg" alt="Fundación Caraso">
</a>
</p>
<p>
Gracias también a
<a target="_blank" href="https://twitter.com/Sanjomix">CEIP San José Obrero</a>
</p>

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
