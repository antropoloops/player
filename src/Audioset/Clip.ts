/**
 * A Clip is something with sound, mapped at space... etcétera...
 */
export interface Clip {
  id: string;
  // metadata
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

interface ClipResources {
  audio: {
    mp3: string;
    ogg?: string;
    wav?: string;
  };
  cover: {
    small: string;
    thumb: string;
  };
}
