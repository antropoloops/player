import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";
import { Waveform } from "./Waveform";

type Props = {
  files: {
    id: string;
    name: string;
    thumbnail?: string;
  }[];
  toPath: (id: string) => string;
  activeId?: string;
};

const AudioFileList: React.FC<Props> = ({ files, toPath, activeId }) => {
  return (
    <React.Fragment>
      {files.map((file) => (
        <Link
          key={file.id}
          className={classcat([
            "block group items-center px-2 mb-1 shadow",
            activeId === file.id
              ? "bg-gray-lighter"
              : "bg-gray-light hover:bg-gray-lighter",
            "text-yellow-400",
          ])}
          to={toPath(file.id)}
        >
          <span className="text-sm">{file.name}</span>
          {file.thumbnail && (
            <Waveform
              className="text-yellow-500"
              width={1000}
              height={100}
              points={file.thumbnail}
            />
          )}
        </Link>
      ))}
    </React.Fragment>
  );
};
export default AudioFileList;
