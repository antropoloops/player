import React from "react";
import { PropertyList } from "../../../@core/components";
import {
  Metadata,
  RemixMetadata,
  Track,
  Clip,
} from "../../../@backend/datastore";

type RemixData = {
  meta: Metadata;
  remix: RemixMetadata;
};

type Props = {
  className?: string;
  remix: RemixData;
  tracks?: Track[];
  samples?: Clip[];
};

const KEYS = [
  "meta.title",
  "meta.description",
  "meta.authors",
  "remix.bpm",
  "tracks",
  "samples",
];

export function RemixProperties({ className, remix, tracks, samples }: Props) {
  return (
    <PropertyList
      className={className}
      keys={KEYS}
      labels={{
        "meta.title": "Título",
        "meta.description": "Descipción",
        "meta.authors": "Autoría",
        "remix.bpm": "bpm",
      }}
      values={{
        meta: remix.meta,
        remix: remix.remix,
        tracks: tracks?.length || 0,
        samples: samples?.length || 0,
      }}
    />
  );
}
