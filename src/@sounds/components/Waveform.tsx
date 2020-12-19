import React, { forwardRef, useEffect, useState } from "react";
import { getPolygonPoints } from "../lib/svg-wave";

type WaveformProps = {
  className?: string;
  width: number;
  height: number;
  points: string;
  style?: React.CSSProperties;
};

export function Waveform({
  className,
  width,
  height,
  points,
  style,
}: WaveformProps) {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox={`0 0 ${width} ${height}`}
      style={style}
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}

type BufferWaveformProps = {
  className?: string;
  width: number;
  height: number;
  buffer: AudioBuffer;
  offset?: number;
  duration?: number;
};

// https://github.com/gridsound/gs-ui-components/blob/299adc0c5739a578453d794e875c0e8e8a74d935/gsuiWaveform/gsuiWaveform.js
export const BufferWaveform = forwardRef<SVGSVGElement, BufferWaveformProps>(
  (
    {
      className,
      width,
      height,
      buffer,
      offset = 0,
      duration = buffer.duration - offset,
    },
    ref
  ) => {
    const [poly, setPoly] = useState<SVGPolygonElement | null>(null);

    useEffect(() => {
      if (!poly) return;

      const points = getPolygonPoints(buffer, width, height, offset, duration);
      poly.setAttribute("points", points);
    }, [poly, buffer, width, height, offset, duration]);

    return (
      <svg
        ref={ref}
        className={className}
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
      >
        <polygon ref={setPoly} fill="currentColor" />
      </svg>
    );
  }
);
