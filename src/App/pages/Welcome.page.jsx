import React from "react";
import { Link } from "react-router-dom";
import index from "./audioset.index.json";

const AudiosetLink = ({ audioset }) => (
  <li className="AudiosetLink" style={{ margin: "1rem" }}>
    <Link to={`/set/${audioset.id}`} style={{ display: "flex" }}>
      <img src="https://via.placeholder.com/100" alt={audioset.meta.title} />
      <h3>{audioset.meta.title}</h3>
    </Link>
  </li>
);
const Welcome = () => {
  return (
    <div className="App">
      <div className="sidebar">
        <img src="/play-logo.png" alt="Play antropoloops" />
        <ul>
          {index.audiosets.map(audioset => (
            <AudiosetLink key={audioset.id} audioset={audioset} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
