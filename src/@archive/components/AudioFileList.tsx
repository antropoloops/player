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
};

const AudioFileList: React.FC<Props> = ({ files, toPath }) => {
  return (
    <React.Fragment>
      {files.map((file) => (
        <Link
          key={file.id}
          className="block opacity-70 hover:opacity-90"
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
