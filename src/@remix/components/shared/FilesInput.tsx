import classcat from "classcat";
import React, { CSSProperties, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddIcon } from "../../../components/icons/Icons";

type Props = {
  className?: string;
  onChange?: (ids: string[]) => void;
  colors?: string;
  style?: CSSProperties;
  uploadFile: (file: File) => Promise<string>;
};

export const FilesInput: React.FC<Props> = ({
  className,
  onChange,
  children,
  colors,
  style,
  uploadFile,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      setIsUploading(true);
      const saved: string[] = [];
      for (const file of files) {
        const id = await uploadFile(file);
        saved.push(id);
      }
      setIsUploading(false);
      onChange?.(saved);
    },
    accept: ["audio/*"],
  });

  return (
    <button
      style={style}
      disabled={isUploading}
      className={classcat([
        "flex items-center p-1 pr-4 text-ag-dark rounded-full",
        "opacity-75 hover:opacity-100 focus:outline-none",
        colors || "text-black bg-gray-lighter",
        isUploading && "opacity-20",
        className,
      ])}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <AddIcon className="icon mr-2 w-6 h-6" />
      {children}
    </button>
  );
};

export default FilesInput;
