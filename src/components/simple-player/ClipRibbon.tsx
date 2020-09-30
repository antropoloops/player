import React, { useState } from "react";
import cc from "classcat";
import { useGestureResponder } from "react-gesture-responder";
import { Audioset, Track as TrackData } from "../../audioset";
import { State4 } from "../../player4";
//import { ReactComponent as StopIcon } from "../icons/stop-24px.svg";

type Mode = "clips" | "ribbon";

type Props = {
  audioset: Audioset;
  track: TrackData;
  state: State4;
  onClipClicked: (clipId: string) => void;
  isStream: boolean;
};
const ClipRibbon: React.FC<Props> = ({
  track,
  audioset,
  state,
  onClipClicked,
  isStream,
}) => {
  const [mode, setMode] = useState<Mode>("clips");
  const [left, setLeft] = useState(30);

  const { clips } = state.status;

  const clipId = track.clipIds.find((id) => clips[id]?.playing);

  const label = clipId ? audioset.index.clipById[clipId].title : track.name;

  const TrackClips = () => (
    <>
      {track.clipIds.map((id) => (
        <button
          key={id}
          className="ml-2 w-1/6 ratio overflow-hidden"
          onClick={() => {
            onClipClicked(id);
          }}
        >
          <img
            className={clipId === id ? "animate-pulse" : ""}
            alt="cover"
            width="300"
            height="300"
            src={audioset.index.clipById[id].resources.cover.thumb}
          />
          <svg viewBox="0 0 1 1" />
        </button>
      ))}
      <div className="ml-2 w-1/6 ratio flex items-center justify-center"></div>
    </>
  );

  return (
    <div className="flex p-2" style={{ backgroundColor: track.color }}>
      <button
        key={track.id}
        className={cc([
          "w-1/6 ratio bg-gray-light bg-opacity-50 overflow-hidden",
        ])}
        onClick={() => {
          setMode(mode === "clips" ? "ribbon" : "clips");
        }}
      >
        {mode === "ribbon" && clipId && (
          <img
            alt="cover"
            width="300"
            height="300"
            src={audioset.index.clipById[clipId].resources.cover.thumb}
          />
        )}
        <svg viewBox="0 0 1 1" />
      </button>
      {/* {track.clipIds.map((clipId) => (
        <Audio
          key={clipId}
          isStream={isStream}
          audio={audioset.index.clipById[clipId].resources.audio}
          status={clips[clipId]}
          onEnded={() => onClipClicked(clipId)}
        />
      ))} */}
      {mode === "clips" ? (
        <TrackClips />
      ) : (
        <Slider label={label} left={left} onChange={setLeft} />
      )}
    </div>
  );
};

export default ClipRibbon;

type SliderProps = {
  label: string;
  left: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ label, left, onChange }) => {
  const [deltaX, setDeltaX] = useState(0);

  const { bind } = useGestureResponder({
    onStartShouldSet: () => true,
    onRelease: () => {
      onChange(Math.floor(deltaX + left));
      setDeltaX(0);
    },
    onMove: ({ delta }) => {
      setDeltaX(delta[0]);
    },
  });
  return (
    <div className="ml-2 flex items-center flex-grow relative" {...bind}>
      <label className="font-normal">{label}</label>
      <div
        className="absolute inset-y-0 right-0 bg-gray-dark bg-opacity-25"
        style={{ left: Math.floor(deltaX + left) + "px" }}
      />
    </div>
  );
};
