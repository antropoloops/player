import React, { useState } from "react";
import { AddIcon } from "../../components/icons/Icons";
import Layout from "../../components/layout/Layout";
import { useDropzone } from "react-dropzone";
import {
  createAudioThumbnail,
  listAudioFiles,
  saveOfflineMediaFiles,
} from "../offline";
import { useQuery } from "react-query";
import useSimpleAudioContext from "../hooks/useSimpleAudioContext";
import MediaFileItem from "../components/AudioItem";
import classcat from "classcat";
import routes from "../../routes";
import AudioFileList from "../components/AudioFileList";

type Props = {};

const OfflineArchivePage: React.FC<Props> = () => {
  const ctx = useSimpleAudioContext();
  const [isUploading, setIsUploading] = useState(false);

  const { data: files, refetch } = useQuery(["offline-files"], listAudioFiles, {
    staleTime: Infinity,
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files: File[]) => {
      setIsUploading(true);
      const saved = await saveOfflineMediaFiles(files);
      for (const item of saved) {
        await createAudioThumbnail(item, ctx);
      }
      await refetch();
      setIsUploading(false);
    },
    accept: ["audio/*"],
  });
  return (
    <Layout
      desktop={
        <div className="flex max-w-content p-4">
          <button
            disabled={isUploading}
            className={classcat([
              "flex items-center p-1 bg-opacity-70 text-ag-dark rounded-full",
              "bg-yellow-400 bg-opacity-70 hover:bg-opacity-100 focus:outline-none",
              isUploading && "opacity-20",
            ])}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <AddIcon className="icon mr-2 w-6 h-6" />
            <label className="mr-2">
              {isDragActive ? "Soltar audio aqui" : "Añadir audio"}
            </label>
          </button>
        </div>
      }
    >
      {files && (
        <AudioFileList files={files} toPath={routes.archiveOfflineMedia} />
      )}
    </Layout>
  );
};

export default OfflineArchivePage;
