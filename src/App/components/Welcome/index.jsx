import React from "react";
import { Link } from "react-router-dom";
import Layout from "../shared/Layout";
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
    <Layout className="App Wellcome">
      <Layout.Sidebar>
        <ul>
          {index.audiosets.map(audioset => (
            <AudiosetLink key={audioset.id} audioset={audioset} />
          ))}
        </ul>
      </Layout.Sidebar>
    </Layout>
  );
};

export default Welcome;
