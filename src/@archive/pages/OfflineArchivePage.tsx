import React from "react";
import Layout from "../../components/layout/Layout";
import { listAudioFiles } from "../offline";
import { useQuery } from "react-query";
import routes from "../../routes";
import AudioFileList from "../components/AudioFileList";
import UploadMediaInput from "../components/UploadMediaInput";

type Props = {};

const OfflineArchivePage: React.FC<Props> = () => {
  const { data: files, refetch } = useQuery(["offline-files"], listAudioFiles, {
    staleTime: Infinity,
  });
  return (
    <Layout
      desktop={
        <div className="flex max-w-content p-4">
          <UploadMediaInput
            onChange={() => {
              refetch();
            }}
          >
            Añadir sonido
          </UploadMediaInput>
        </div>
      }
    >
      <img src="/images/sections/community.jpg" alt="das" />
      <h2 className="p-1 mb-1 bg-yellow-400 text-bg-dark">Archivo offline</h2>
      {files && (
        <AudioFileList files={files} toPath={routes.archiveOfflineMedia} />
      )}
    </Layout>
  );
};

export default OfflineArchivePage;
