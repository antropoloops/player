import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import Layout from "../../components/layout/Layout";
import routes from "../../routes";
import {
  useGetGroupArchive,
  useListArchiveRecordings,
} from "../hooks/useArchiveQueries";

type Props = {};

const ArchiveShowPage: React.FC<Props> = () => {
  const params = useParams<{ id: string }>();
  const group = useCurrentGroup();
  const groupArchive = {
    groupId: group?.id || "",
    projectId: params.id,
  };
  const { data: archive } = useGetGroupArchive(groupArchive);
  const { data: recordings } = useListArchiveRecordings(groupArchive);

  if (!archive || !recordings) return <Layout />;

  return (
    <Layout sidebar={<div>Hola</div>}>
      {recordings.map((recording) => (
        <div key={recording.id}>Recording</div>
      ))}
    </Layout>
  );
};

export default ArchiveShowPage;
