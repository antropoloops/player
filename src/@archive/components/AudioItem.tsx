import React from "react";
import { Link } from "react-router-dom";
import { OfflineMediaFile } from "../offline";
import { Waveform } from "./Waveform";

type Props = {
  file: OfflineMediaFile;
  to: string;
};

const MediaFileItem: React.FC<Props> = ({ file, to }) => {
  return (
    <li className="p-2 mb-2 bg-ag-light shadow ">
      <Link className="block opacity-70 hover:opacity-90" to={to}>
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
    </li>
  );
};
export default MediaFileItem;
