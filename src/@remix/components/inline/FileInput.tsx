import classcat from "classcat";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudUploadIcon,
  CloudQueueIcon,
} from "../../../components/icons/Icons";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  parentKey: string;
  accept?: string[];
  uploadFile: (file: File) => Promise<string>;
};

export const FileInput: React.FC<Props> = ({
  onChange,
  onSave,
  accept,
  children,
  uploadFile,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      const file = files[0];
      if (file) {
        setIsUploading(true);
        const id = await uploadFile(file);
        setIsUploading(false);
        onChange?.(id);
        onSave?.(id);
      }
    },
    accept,
  });

  const Icon = isUploading ? CloudQueueIcon : CloudUploadIcon;

  return (
    <button
      disabled={isUploading}
      className={classcat([
        "flex items-center p-2 text-ag-dark",
        "bg-gray-darker text-white-dark hover:text-white",
        "focus:outline-none",
        isUploading && "opacity-20",
      ])}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon className="fill-current mr-2 w-6 h-6" />
      <label className="mr-2">{children}</label>
    </button>
  );
};
