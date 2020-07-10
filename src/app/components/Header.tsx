import React from "react";
import { Link } from "react-router-dom";
import { BundleMetadata } from "../../audioset";
import "./Header.css";
import { ArrowLeft } from "./Icons";
import routes from "../routes";

interface HeaderProps {
  meta: BundleMetadata;
}

const getAudiosetPath = (path: string) =>
  path && path !== "index" ? `/set/${path}` : `/`;

/**
 * The header
 */
export const Header = ({ meta }: Partial<HeaderProps>) =>
  meta && meta.path !== "index" ? <BundleHeader meta={meta} /> : <LogoHeader />;

export interface BundleHeaderProps {
  title: string;
  path: string;
}

export const BundleHeader = ({ meta }: HeaderProps) => (
  <div className="Header">
    <Link
      className="p-2 flex items-center text-white"
      to={getAudiosetPath(meta.parent_path)}
    >
      <ArrowLeft className="text-gray-light" />
      <h1>{meta?.title}</h1>
    </Link>
  </div>
);

export const LogoHeader = () => (
  <div className="Header">
    <div className="logo">
      <Link to={routes.root()}>
        <img
          className="play-logo"
          src="/play-logo.png"
          alt="Play antropoloops"
        />
      </Link>
    </div>
  </div>
);
