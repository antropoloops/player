import React from "react";
import { PropertyList } from "../../../@core/components";
import { Metadata } from "../../../@backend/datastore";

type ArchiveData = {
  meta: Metadata;
};

type Props = {
  className?: string;
  archive: ArchiveData;
};

export default function ArchiveProperties({ className, archive }: Props) {
  return (
    <PropertyList
      className={className}
      keys={["meta.title", "meta.description", "meta.authors"]}
      labels={{
        "meta.title": "Título",
        "meta.description": "Descipción",
        "meta.authors": "Autoría",
      }}
      values={archive}
    />
  );
}
