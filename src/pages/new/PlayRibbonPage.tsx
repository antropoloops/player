import React, { useState } from "react";
import cc from "classcat";
import { useGestureResponder } from "react-gesture-responder";
import { useQuery } from "react-query";
import Layout from "../../components/layout/Layout";
import API from "../../api";
import { Audioset, safeFindClipById, Track as TrackData } from "../../audioset";

const url =
  "https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/continentes.audioset.json";

type Props = {};
const PlayRibbonPage: React.FC<Props> = () => {
  const { data } = useQuery(["player2"], () =>
    API.bundles.get({ url, path: "" })
  );

  const audioset = data ? ((data as any) as Audioset) : undefined;

  return (
    <Layout title={audioset ? audioset.meta.title : "Loading..."} backTo="/">
      <div className="h-full">
        {audioset?.tracks.map((track) => (
          <Track key={track.id} track={track} audioset={audioset} />
        ))}
      </div>
    </Layout>
  );
};
export default PlayRibbonPage;

type TrackProps = {
  audioset: Audioset;
  track: TrackData;
};

const Track: React.FC<TrackProps> = ({ track, audioset }) => {
  const [isOpen, setOpen] = useState(false);
  const [clipId, setClipId] = useState("");
  const [left, setLeft] = useState(30);

  const label = clipId ? safeFindClipById(audioset, clipId).title : track.name;

  const Selector = () => (
    <>
      {track.clipIds.map((id) => (
        <button
          key={id}
          className="ml-2 w-1/6 ratio rounded overflow-hidden"
          onClick={() => {
            setClipId(id);
            setOpen(false);
          }}
        >
          <img
            className={clipId === id ? "opacity-100" : "opacity-50"}
            alt="cover"
            width="300"
            height="300"
            src={safeFindClipById(audioset, id).resources.cover.thumb}
          />
          <svg viewBox="0 0 1 1" />
        </button>
      ))}
      <button
        className="ml-2 w-1/6 ratio rounded overflow-hidden border border-gray-light"
        onClick={() => {
          setClipId("");
          setOpen(false);
        }}
      >
        <svg viewBox="0 0 1 1" />
      </button>
    </>
  );

  return (
    <div className="flex p-2" style={{ backgroundColor: track.color }}>
      <button
        key={track.id}
        className={cc([
          "w-1/6 ratio bg-gray-light rounded bg-opacity-50 overflow-hidden",
        ])}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {clipId && (
          <img
            alt="cover"
            width="300"
            height="300"
            src={safeFindClipById(audioset, clipId).resources.cover.thumb}
          />
        )}
        <svg viewBox="0 0 1 1" />
      </button>
      {isOpen ? (
        <Selector />
      ) : (
        <Slider label={label} left={left} onChange={setLeft} />
      )}
    </div>
  );
};

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
