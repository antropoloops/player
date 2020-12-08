import classcat from "classcat";
import React, { CSSProperties, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddIcon } from "../../components/icons/Icons";
import useSimpleAudioContext from "../hooks/useSimpleAudioContext";
import {
  createAudioThumbnail,
  OfflineMediaFileAndData,
  saveOfflineMediaFiles,
} from "../offline";

type Props = {
  onChange: (mediaFiles: OfflineMediaFileAndData[]) => void;
  textColor?: string;
  bgColor?: string;
  style?: CSSProperties;
};

const UploadMediaInput: React.FC<Props> = ({
  onChange,
  children,
  textColor,
  bgColor,
  style,
}) => {
  const ctx = useSimpleAudioContext();
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      setIsUploading(true);
      const saved = await saveOfflineMediaFiles(files);
      for (const item of saved) {
        await createAudioThumbnail(item, ctx);
      }
      setIsUploading(false);
      onChange(saved);
    },
    accept: ["audio/*"],
  });

  return (
    <button
      style={style}
      disabled={isUploading}
      className={classcat([
        "flex items-center p-1 bg-opacity-70 text-ag-dark rounded-full",
        textColor || "text-gray-dark",
        bgColor === undefined ? "bg-yellow-400" : bgColor,
        "bg-opacity-70 hover:bg-opacity-100 focus:outline-none",
        isUploading && "opacity-20",
      ])}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <AddIcon className="icon mr-2 w-6 h-6" />
      <label className="mr-2">{children}</label>
    </button>
  );
};

export default UploadMediaInput;
