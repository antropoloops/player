import React from "react";
import { Audioset } from "../../../audioset";

export type EditorProps = {
  audioset: Audioset;
  onChange: (audioset: Audioset) => void;
  type: string;
  id: string;
};

const Editor: React.FC<EditorProps> = () => {
  return <div className="">Algo ha ido mal</div>;
};
export default Editor;
