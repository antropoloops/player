import React from "react";
import { Link } from "react-router-dom";
import { AudiosetMetadata } from "../../audioset";
import "./Header.css";
import { ArrowLeft } from "./Icons";

interface HeaderProps {
  meta?: AudiosetMetadata;
}

const getAudiosetPath = (path: string) => (path ? `/set/${path}` : `/`);

/**
 * The header
 */
export const Header = ({ meta }: HeaderProps) =>
  meta && meta.path !== "index" ? (
    <ControlHeader
      title={meta.title}
      path={getAudiosetPath(meta.parent_path)}
    />
  ) : (
    <LogoHeader />
  );

interface ControlHeaderProps {
  title: string;
  path: string;
}

const ControlHeader = ({ title, path }: ControlHeaderProps) => (
  <div className="Header">
    <Link className="navigation" to={path}>
      <ArrowLeft />
      <h1>{title}</h1>
    </Link>
  </div>
);

const LogoHeader = () => (
  <div className="Header">
    <div className="logo">
      <img className="play-logo" src="/play-logo.png" alt="Play antropoloops" />
    </div>
  </div>
);
