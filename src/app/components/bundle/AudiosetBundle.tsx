import React from "react";
import { Audioset } from "../../../audioset";
import { Section } from "../../api/sections";
import PlayPanelScreen from "../play-panel/PlayPanelScreen";
import PlayMapScreen from "../play-map/PlayMapScreen";

export type Props = {
  section?: Section;
  audioset: Audioset;
};

const AudiosetBundle: React.FC<Props> = ({ audioset }) => {
  const isMap = audioset.visuals.mode === "map";
  const isPoly = audioset.audio.mode === "1"; // FIXME
  return isMap || isPoly ? (
    <PlayMapScreen audioset={audioset} />
  ) : (
    <PlayPanelScreen audioset={audioset} />
  );
};

export default AudiosetBundle;
