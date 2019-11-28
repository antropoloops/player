export interface StartClip {
  command: "startClip";
  clipId: string;
  time: number;
}
export interface StopClip {
  command: "stopClip";
  clipId: string;
  time: number;
}
export interface StartTrack {
  command: "startTrack";
  trackId: string;
  time: number;
}
export interface StopTrack {
  command: "stopTrack";
  trackId: string;
  time: number;
}

export type ControlCommand = StartClip | StopClip | StartTrack | StopTrack;
