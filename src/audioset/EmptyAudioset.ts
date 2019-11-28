import { Audioset } from "./Audioset";

export const EmptyAudioset: Audioset = {
  type: "audioset",
  id: "none",
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
  index: {
    clipById: {},
    trackById: {},
    clipIdsOfTrack: {},
    trackIdOfClip: {},
  },
};
