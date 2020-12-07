import React from "react";
import { FolderOpenIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import useLocale from "../../hooks/useLocale";
import { useDropzone } from "react-dropzone";
import {
  createAudioThumbnail,
  listAudioFiles,
  saveOfflineMediaFiles,
} from "../offline";
import { useQuery } from "react-query";
import useSimpleAudioContext from "../hooks/useSimpleAudioContext";
import MediaFileItem from "../components/AudioItem";

type Props = {};

const OfflineArchivePage: React.FC<Props> = () => {
  const ctx = useSimpleAudioContext();

  const { data: files, refetch } = useQuery(["offline-files"], listAudioFiles, {
    staleTime: Infinity,
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files: File[]) => {
      const saved = await saveOfflineMediaFiles(files);
      for (const item of saved) {
        await createAudioThumbnail(item, ctx);
      }
      await refetch();
    },
    accept: ["audio/*"],
  });
  return (
    <Layout
      desktop={
        <div className="flex max-w-content p-4">
          <button
            className="flex items-center p-1 bg-yellow-300 bg-opacity-70 text-ag-dark rounded-full focus:outline-none"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <FolderOpenIcon className="icon ml-1 mr-2 w-4 h-4" />
            <label className="mr-2">Añadir audio</label>
          </button>
        </div>
      }
    >
      {files &&
        files.map((file) => (
          <MediaFileItem key={file.id} file={file} to={"/dasdsa"} />
        ))}
    </Layout>
  );
};

export default OfflineArchivePage;
