import React from "react";
import EditAudioset from "./EditAudioset";
import EditAudiosetImage from "./EditAudiosetImage";
import EditClip from "./EditClip";
import { EditClipAudio } from "./EditClipAudio";
import EditClipImage from "./EditClipImage";
import Editor, { EditorProps } from "./Editor";
import EditTrack from "./EditTrack";

const EDITORS: Record<string, React.FC<EditorProps>> = {
  "": EditAudioset,
  audioset: EditAudioset,
  clip: EditClip,
  track: EditTrack,
  logo: EditAudiosetImage,
  "clip-image": EditClipImage,
  "clip-audio": EditClipAudio,
} as const;

export type EditorType = keyof typeof EDITORS;

const EditorConductor: React.FC<EditorProps> = (props) => {
  const Component = EDITORS[props.type] || Editor;

  return <Component {...props} />;
};
export default EditorConductor;
