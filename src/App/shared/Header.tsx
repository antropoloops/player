import React from "react";
import { Link } from "react-router-dom";
import { AudiosetMetadata } from "../../Audioset";

interface HeaderProps {
  meta: AudiosetMetadata;
}

const getAudiosetPath = (path: string) => (path ? `/set/${path}` : `/`);

export const Header = (props: HeaderProps) =>
  props.meta.path === "index" ? LogoHeader() : ControlHeader(props);

const ControlHeader = ({ meta }: HeaderProps) => (
  <div className="header">
    <Link to={getAudiosetPath(meta.parent_path)}>&lt;&lt;&nbsp;</Link>

    <span>{meta.title}</span>
  </div>
);

const LogoHeader = () => (
  <div className="header">
    <img
      style={{ maxHeight: "2rem" }}
      className="play-logo"
      src="/play-logo.png"
      alt="Play antropoloops"
    />
  </div>
);
