import { Audioset } from "./Audioset";

export const EmptyAudioset: Audioset = {
  type: "audioset",
  id: "",
  meta: {
    title: "",
    description: "",
    path: "",
    parent_path: "",
    logo_url: "",
    readme: "",
  },
  audio: {
    bpm: 120,
    defaults: {
      loop: true,
    },
    mode: "0",
    signature: [4, 4],
    trackMaxVoices: 1,
    quantize: 0,
  },
  visuals: {
    mode: "map",
    geomap: {
      url: "",
      scaleFactor: 1,
      center: {
        x: 0,
        y: 0,
      },
    },
  },
  tracks: [],
  clips: [],
};
