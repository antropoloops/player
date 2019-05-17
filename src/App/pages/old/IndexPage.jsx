/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Centered from "../shared/Centered";
import { Link } from "react-router-dom";
import index from "./audioset.index.json";

const AudiosetLink = ({ audioset }) => (
  <li css={linkStyles}>
    <Link to={`/p/${audioset.id}`}>
      <h3>{audioset.meta.title}</h3>
      <p>{audioset.meta.description}</p>
      <button>Open</button>
    </Link>
  </li>
);

const linkStyles = css`
  list-style: none;
  margin: 1rem 0;

  a {
    display: block;
    text-decoration: none;
  }
  a:hover {
    opacity: 0.6;
  }
`;

const Index = () => (
  <Centered>
    <h1>Play antropoloops</h1>
    <ul>
      {index.audiosets.map(audioset => (
        <AudiosetLink key={audioset.id} audioset={audioset} />
      ))}
    </ul>
  </Centered>
);

export default Index;
