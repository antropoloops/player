/**
 * A Clip is something with sound, mapped at space... etcétera...
 */
export interface Clip {
  id: string;
  // metadata
  name: string;
  title: string;
  album: string;
  year: string;
  // FIXME: ensure in the response (derived)
  artist: string;
  place: string;
  country: string;

  // keyboard
  keyMap: string;

  // track
  trackId: string;
  trackNum: number;

  // visuals
  color: string;
  position: [number, number];

  // audio
  audio: {
    beats: number;
    // FIXME: derived
    volume: number;
    // FIXME: derived
    durationSeconds: number;
  };

  resources: {
    audio: AudioResources;
    cover: {
      small: string;
      thumb: string;
      storage?: {
        offlineId: string;
        hash: string;
        mimeType: string;
        width: number;
        height: number;
        crop: {
          aspect?: number;
          x?: number;
          y?: number;
          width?: number;
          height?: number;
          unit?: "px" | "%";
        };
      };
    };
  };
}

export type AudioResources = {
  mp3?: string;
  ogg?: string;
  wav: string;
  storage?: {
    fileName: string;
    offlineId: string; // file.mediaFile.id
    offlineKey: string; // file.data.key (blobs)
    mimeType: string;
    duration: number;
    waveform: string;
    region: {
      offset: 0;
      duration?: 0;
    };
  };
};

export function createEmptyClip(data: Partial<Clip>): Clip {
  return {
    id: "",
    // metadata
    name: "",
    title: "",
    album: "",
    year: "",
    // FIXME: ensure in the response (derived)
    artist: "",
    place: "",
    country: "",

    // keyboard
    keyMap: "",

    // track
    trackId: "",
    trackNum: 0,

    // visuals
    color: "",
    position: [0, 0],

    // audio
    audio: {
      beats: 0,
      // FIXME: derived
      volume: 0,
      // FIXME: derived
      durationSeconds: 0,
    },

    resources: {
      audio: {
        wav: "",
      },
      cover: {
        small: "",
        thumb: "",
      },
    },
    ...data,
  };
}
