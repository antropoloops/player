import React, { useState } from "react";
import Spinner from "../Spinner";
import { ReactComponent as PlayIcon } from "../../assets/play-circle.svg";

export type SelectClipProps = {
  clipId: string;
  color: string;
  keyboard: string;
  isRunning: boolean;
  coverUrl: string;
  toggle: () => void;
};

const SelectClip: React.FC<SelectClipProps> = ({
  clipId,
  color,
  keyboard,
  isRunning,
  toggle,
  coverUrl,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      key={clipId}
      className="ml-2 w-1/6 ratio rounded overflow-hidden relative"
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        className={isRunning ? "opacity-75" : "opacity-100"}
        alt="cover"
        width="300"
        height="300"
        src={coverUrl}
      />
      <svg viewBox="0 0 1 1" />
      <div className="absolute inset-0 flex items-center justify-center">
        {hover ? (
          isRunning ? (
            <div className="w-6 h-6 bg-black rounded-sm" />
          ) : (
            <PlayIcon className="w-12 h-12 text-black mt-2" />
          )
        ) : isRunning ? (
          <Spinner color={color} />
        ) : (
          <div className="text-white bg-black w-8 h-8 uppercase rounded-full leading-8 text-center opacity-50">
            {keyboard}
          </div>
        )}
      </div>
    </button>
  );
};
export default SelectClip;
