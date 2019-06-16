import React from "react";
import { Link } from "react-router-dom";
import Layout from "../shared/Layout";
import { useAudioContext } from "../../hooks/useAudioContext";
import "./Welcome.css";
import { Readme } from "../shared/Readme";

const AudiosetLink = ({ audioset }) => (
  <li className="AudiosetLink">
    <Link to={`/set/${audioset.publish_path}`} style={{ display: "flex" }}>
      <img src={audioset.logo_url} alt={audioset.title} />
      <div className="meta">
        <h3>{audioset.title} →</h3>
        <p>{audioset.description}</p>
      </div>
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
      <Layout.Main>
        <Readme className="main-gradient" readme={index.meta.readme} />
      </Layout.Main>
    </Layout>
  );
};

export default Welcome;
