import React from "react";
import { PropertyList } from "../../@core/components";
import { RemixMetadata } from "../../@backend/datastore";

type Props = {
  className?: string;
  meta: RemixMetadata;
};

export function RemixProperties({ className, meta }: Props) {
  return (
    <PropertyList
      className={className}
      keys={["title", "description", "bpm"]}
      labels={{
        title: "Título",
        description: "Descipción",
        bpm: "bpm",
      }}
      values={meta}
    />
  );
}
