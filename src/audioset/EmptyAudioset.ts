import { Audioset } from "./Audioset";

export const EmptyAudioset: Audioset = {
  format: "atpls-audioset",
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
