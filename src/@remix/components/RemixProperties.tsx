import React from "react";
import { PropertyList } from "../../@core/components";
import { Metadata, RemixMetadata } from "../../@backend/datastore";

type RemixData = {
  meta: Metadata;
  remix: RemixMetadata;
};

type Props = {
  className?: string;
  remix: RemixData;
};

export function RemixProperties({ className, remix }: Props) {
  return (
    <PropertyList
      className={className}
      keys={["meta.title", "meta.description", "meta.authors", "remix.bpm"]}
      labels={{
        "meta.title": "Título",
        "meta.description": "Descipción",
        "meta.authors": "Autoría",
        "remix.bpm": "bpm",
      }}
      values={remix}
    />
  );
}
