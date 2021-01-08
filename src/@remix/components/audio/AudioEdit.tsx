import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { StoredFile } from "../../../models";
import useAudioFile from "../../hooks/useAudioFile";
import { Waveform } from "../../../@sounds/components/Waveform";
import { formatDuration } from "../../../@sounds/helpers/timeHelpers";
import { PlayButton } from "../../../@sounds/components/PlayButton";
import { usePlayBuffer } from "../../hooks/usePlayBuffer";
import { getPolygonPoints } from "../../../@archive/lib/svg-wave";
import { useGestureResponder } from "react-gesture-responder";
import { formatTime } from "../../helpers/timeHelpers";

type Props = {
  className?: string;
  file?: StoredFile;
  color: string;
};

function useElementWidth() {
  const [element, ref] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries: any[]) => {
        if (entries[0]) {
          const rect = entries[0].contentRect;
          setWidth(rect.width);
        }
      }),
    []
  );
  useLayoutEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, observer]);

  return { element, ref, width };
}

function useAudioRegion() {
  const { element, ref, width } = useElementWidth();
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const elOffsetX = useMemo(() => {
    if (!element) return 0;
    return element.getBoundingClientRect().left;
  }, [element]);

  const getWavePosition = (x: number) => {
    const pos = x - elOffsetX;
    return pos < 0 ? 0 : pos > width ? width : pos;
  };

  const { bind: bindLeft } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: ({ xy }) => {
      setLeft(getWavePosition(xy[0]));
    },
  });
  const { bind: bindRight } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: ({ xy }) => {
      setRight(width - getWavePosition(xy[0]));
    },
  });

  return { left, right, bindLeft, bindRight, waveRef: ref, width };
}

export default function AudioEdit({ className, file, color }: Props) {
  const [size, setSize] = useState({ width: 100, height: 10 });
  const [thumbnail, setThumbnail] = useState("");
  const { left, right, bindLeft, bindRight, waveRef, width } = useAudioRegion();

  const { buffer, load } = useAudioFile(file);

  const pixelsToTime = (position: number, duration: number) => {
    return (position * duration) / width;
  };

  useEffect(() => {
    if (!buffer) {
      load();
      return;
    }
    const width = 1000;
    const height = 200;

    const points = getPolygonPoints(buffer, width, height);
    setSize({ width, height });
    setThumbnail(points);
  }, [buffer, load]);

  const [play, { playing }] = usePlayBuffer(buffer, {
    offset: 0,
    duration: buffer?.duration || 0,
  });

  return (
    <div className={className}>
      {file && (
        <label htmlFor="Nombre del sonido" className="text-sm lg:text-base">
          {file.fileName} {formatDuration(file.duration)}
        </label>
      )}
      <div className="my-8 flex items-center">
        {file && (
          <PlayButton
            className="border-2 rounded-full mr-4"
            style={{ borderColor: color, color }}
            onClick={() => {
              if (playing) {
                play(false);
              } else if (buffer) {
                play(true);
              } else {
                load().then(() => {
                  play(true);
                });
              }
            }}
            playing={playing}
          />
        )}
        <div
          ref={waveRef}
          className="relative flex-grow mt-1 p-1 bg-gray-darker text-remixes opacity-75"
        >
          <Waveform
            width={size.width}
            height={size.height}
            points={thumbnail || file?.thumbnail || ""}
            style={{ color }}
          />
          <div
            className="absolute inset-y-0 border border-white border-dashed"
            style={{ left, right }}
          />
          <div
            {...bindLeft}
            className="absolute inset-y-0 w-4 cursor-move"
            style={{ left: left - 8 }}
          />
          <div
            {...bindRight}
            className="absolute inset-y-0 w-4 cursor-move"
            style={{ right: right - 8 }}
          />
        </div>
      </div>

      <div>
        {formatTime(pixelsToTime(left, buffer?.duration || 0))} {pixelsToTime}{" "}
        {left}
      </div>
    </div>
  );
}
