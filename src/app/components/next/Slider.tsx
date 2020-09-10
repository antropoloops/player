import React, { useState } from "react";
import { useGestureResponder } from "react-gesture-responder";

type Props = {
  label: string;
  left: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<Props> = ({ label, left, onChange }) => {
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

export default Slider;
