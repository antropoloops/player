import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import { useAudioContext } from "../../hooks/useAudioContext";

const AudiosetLink = ({ audioset }) => (
  <li className="AudiosetLink" style={{ margin: "1rem" }}>
    <Link to={`/set/${audioset.id}`} style={{ display: "flex" }}>
      <img src="https://via.placeholder.com/100" alt={audioset.meta.title} />
      <h3>{audioset.meta.title} →</h3>
    </Link>
  </li>
);
const Welcome = ({ index }) => {
  useAudioContext();
  return (
    <div className="App Wellcome">
      <Sidebar>
        <ul>
          {index.audiosets.map(audioset => (
            <AudiosetLink key={audioset.id} audioset={audioset} />
          ))}
        </ul>
      </Sidebar>
    </div>
  );
};

export default Welcome;
