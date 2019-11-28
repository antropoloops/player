/**
 * Possible Player states
 */
export type PlayingStatus = "stopped" | "playing"; // | "playScheduled" |  "stopScheduled";

export interface ClipPlayingState {
  readonly status: PlayingStatus;
}
export interface TrackPlayingState {
  readonly status: PlayingStatus;
  readonly volume: number;
}

export interface ControlState {
  clips: ClipPlayingStateByClipId;
  tracks: TrackPlayingStateByTrackId;
}
export type ClipPlayingStateByClipId = Record<string, ClipPlayingState>;
export type TrackPlayingStateByTrackId = Record<string, TrackPlayingState>;
