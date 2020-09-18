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

  resources: ClipResources;
}

export type AudioResources = {
  mp3: string;
  ogg?: string;
  wav?: string;
};

interface ClipResources {
  audio: AudioResources;
  cover: {
    small: string;
    thumb: string;
  };
}
