import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AudioRegion, StoredFile } from "../../../models";
import useAudioFile from "../../hooks/useAudioFile";
import { Waveform } from "../../../@sounds/components/Waveform";
import { formatDuration } from "../../../@sounds/helpers/timeHelpers";
import { PlayButton } from "../../../@sounds/components/PlayButton";
import { usePlayBuffer } from "../../hooks/usePlayBuffer";
import { getPolygonPoints } from "../../../@archive/lib/svg-wave";
import { useGestureResponder } from "react-gesture-responder";
import { formatTime } from "../../helpers/timeHelpers";
import { Heading } from "../../../@core/components";
import { CloseIcon, DoneIcon } from "../../../components/icons/Icons";
import ActionButton from "../shared/ActionButton";
import ActionLink from "../shared/ActionLink";
import classcat from "classcat";
import { getBlob } from "../../../@backend/storage";
import { useHistory } from "react-router-dom";

type Props = {
  className?: string;
  file?: StoredFile;
  color: string;
  backTo: string;
  region?: AudioRegion;
  saveFile: (file: File, region: AudioRegion) => Promise<any>;
};

export default function AudioEdit({
  className,
  file,
  color,
  backTo,
  saveFile,
}: Props) {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const { buffer, load } = useAudioFile(file);
  const [size, setSize] = useState({ width: 100, height: 10 });
  const [thumbnail, setThumbnail] = useState("");
  const {
    left,
    right,
    bindLeft,
    bindRight,
    waveRef,
    timeLeft,
    timeRight,
    duration,
  } = useAudioRegion(buffer);

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
    offset: timeLeft,
    duration,
  });

  const createRegionFile = async () => {
    if (!file) return false;

    const ffmpeg = await import("../../lib/ffmpeg");
    const blob = await getBlob(file?.key);
    if (!blob) return false;

    const regionBlob = await ffmpeg.sliceAudio(blob, {
      mimeType: file.mimeType,
      offset: timeLeft,
      duration,
    });
    const regionFile = new File([regionBlob], file.fileName || "");
    return await saveFile(regionFile, {
      offset: timeLeft,
      duration,
    });
  };

  return (
    <div className={className}>
      {file && (
        <label htmlFor="Nombre del sonido" className="text-sm lg:text-base">
          {file.fileName} {formatDuration(file.duration)}
        </label>
      )}
      <div className={classcat(["my-8", disabled && "opacity-50"])}>
        <div className="my-4 flex items-center">
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
          <Heading level={2}>{formatTime(0)}</Heading>
          <div className="flex m-4">
            <div className="mr-4">
              <label>Duración: </label>
              {formatTime(timeRight - timeLeft)}
            </div>
            <div>
              <label>Inicio: </label>
              {formatTime(timeLeft)}
            </div>
            <div className="ml-4">
              <label>Final: </label>
              {formatTime(timeRight)}
            </div>
          </div>
        </div>
        <div
          ref={waveRef}
          className={classcat([
            "relative overflow-hidden flex-grow mt-1 p-1",
            "bg-gray-darker text-remixes opacity-75",
          ])}
        >
          <Waveform
            width={size.width}
            height={size.height}
            points={thumbnail || file?.thumbnail || ""}
            style={{ color }}
          />
          <div
            className="region absolute inset-y-0 border border-white border-dashed"
            style={{ left, right }}
          />

          {!disabled && (
            <div
              {...bindLeft}
              className="absolute inset-y-0 w-4 cursor-move"
              style={{ left: left - 8 }}
            />
          )}
          {!disabled && (
            <div
              {...bindRight}
              className="absolute inset-y-0 w-4 cursor-move"
              style={{ right: right - 8 }}
            />
          )}
        </div>
      </div>
      <div className="flex py-4">
        <ActionButton
          icon={DoneIcon}
          onClick={() => {
            setDisabled(true);
            createRegionFile().then((result) => {
              console.log("çjodEr", result);
              if (result) {
                history.push(backTo);
              }
            });
          }}
        >
          Guardar
        </ActionButton>
        <ActionLink icon={CloseIcon} to={backTo}>
          Cancelar
        </ActionLink>
      </div>
    </div>
  );
}

function useAudioRegion(buffer?: AudioBuffer, region?: AudioRegion) {
  const { element, ref, width } = useResizeObserver();
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

  const bufferDuration = buffer?.duration || 0;
  const pixelsToTime = bufferDuration / width;

  const timeLeft = left * pixelsToTime;
  const timeRight = (width - right) * pixelsToTime;
  const duration = timeRight - timeLeft;

  return {
    left,
    right,
    bindLeft,
    bindRight,
    waveRef: ref,
    timeLeft,
    timeRight,
    duration,
  };
}

function useResizeObserver() {
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
