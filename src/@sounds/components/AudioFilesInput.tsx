import classcat from "classcat";
import React, { CSSProperties, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddIcon } from "../../components/icons/Icons";
import useAudioContext from "../../hooks/useAudioContext";
import {
  addAudioInformation,
  createOfflineSound,
  OfflineSound,
} from "../backend";

type Props = {
  onChange: (mediaFiles: OfflineSound[]) => void;
  textColor?: string;
  bgColor?: string;
  style?: CSSProperties;
};

export const AudioFilesInput: React.FC<Props> = ({
  onChange,
  children,
  textColor,
  bgColor,
  style,
}) => {
  const ctx = useAudioContext();
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      setIsUploading(true);
      const saved: OfflineSound[] = [];
      for (const file of files) {
        const sound = await createOfflineSound(file.name, file);
        if (ctx) await addAudioInformation(sound);
        saved.push(sound);
      }
      setIsUploading(false);
      onChange(saved);
    },
    accept: ["audio/*"],
  });

  const disabled = !ctx || isUploading;

  return (
    <div
      style={style}
      className={classcat([
        "flex items-center p-1 bg-opacity-70 text-ag-dark rounded-full",
        "cursor-pointer",
        textColor || "text-gray-black",
        bgColor === undefined ? "bg-gray-light" : bgColor,
        disabled
          ? "bg-opacity-20"
          : "bg-opacity-70 hover:bg-opacity-100 focus:outline-none",
        isUploading && "opacity-20",
      ])}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <AddIcon className="mr-2 w-6 h-6 text-gray-light" />
      <div className="mr-2">{children}</div>
    </div>
  );
};
