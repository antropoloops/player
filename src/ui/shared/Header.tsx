import React from "react";
import { Link } from "react-router-dom";
import { AudiosetMetadata } from "../../audioset";
import "./Header.css";
import { ArrowLeft } from "./Icons";

interface HeaderProps {
  meta: AudiosetMetadata;
}

const getAudiosetPath = (path: string) => (path ? `/set/${path}` : `/`);

/**
 * The header
 */
export const Header = (props: HeaderProps) =>
  props.meta.path === "index" ? LogoHeader() : ControlHeader(props);

const ControlHeader = ({ meta }: HeaderProps) => (
  <div className="Header">
    <Link className="navigation" to={getAudiosetPath(meta.parent_path)}>
      <ArrowLeft width="24" height="24" />
      <h1>{meta.title}</h1>
    </Link>
  </div>
);

const LogoHeader = () => (
  <div className="Header logo">
    <div className="logo-wrap">
      <img className="play-logo" src="/play-logo.png" alt="Play antropoloops" />
    </div>
  </div>
);
