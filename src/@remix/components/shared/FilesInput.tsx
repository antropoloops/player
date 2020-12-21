import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ActionIcon, getActionProps } from "./ActionButton";

type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

type Props = {
  className?: string;
  onChange?: (ids: string[]) => void;
  colors?: string;
  uploadFile: (file: File) => Promise<string>;
  icon?: SvgIcon;
  smallIcon?: boolean;
  fileType: "audio" | "image";
  maxFiles?: number;
  bgColor?: string;
};

export const FilesInput: React.FC<Props> = (props) => {
  const [isUploading, setIsUploading] = useState(false);

  const { uploadFile, onChange, fileType, maxFiles, children } = props;

  const accept = fileType === "audio" ? ["audio/*"] : ["image/*"];

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
    accept: accept,
    maxFiles: maxFiles,
  });

  return (
    <button
      {...getActionProps({ ...props, working: isUploading })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <ActionIcon {...props} working={isUploading} />
      {children}
    </button>
  );
};

export default FilesInput;
