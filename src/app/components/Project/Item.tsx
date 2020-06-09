import React from "react";
import { Link } from "react-router-dom";
import { AudiosetReference } from "../../../audioset";
import routes from "../../routes";

interface ItemProps {
  reference: AudiosetReference;
}

export const Item = ({ reference }: ItemProps) => (
  <Link to={routes.set(reference.publish_path)}>
    <div className="Item">
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
