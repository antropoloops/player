import React from "react";
import { Link } from "react-router-dom";
import { AudiosetReference as Reference } from "../../audioset";

interface AudiosetReferenceProps {
  reference: Reference;
}

export const AudiosetReference = ({ reference }: AudiosetReferenceProps) => (
  <Link to={`/set/${reference.publish_path}`}>
    <div className="AudiosetReference">
      <div className="image">
        {/* This is hack to keep img in Safari responsive */}
        <img src={reference.logo_url} alt={reference.title} />
      </div>
      <div className="meta">
        <h3>{reference.title}</h3>
        <p>{reference.description}</p>
      </div>
    </div>
  </Link>
);
