import React from "react";
import { Link } from "react-router-dom";
import { AudiosetReference } from "../../audioset";

interface AudiosetItemProps {
  audioset: AudiosetReference;
}

export const AudiosetItem = ({ audioset }: AudiosetItemProps) => (
  <Link to={`/set/${audioset.publish_path}`}>
    <div className="AudiosetItem">
      <div className="image">
        {/* This is hack to keep img in Safari responsive */}
        <img src={audioset.logo_url} alt={audioset.title} />
      </div>
      <div className="meta">
        <h3>{audioset.title}</h3>
        <p>{audioset.description}</p>
      </div>
    </div>
  </Link>
);
