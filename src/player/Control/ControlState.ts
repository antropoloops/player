import { ClipPlayingState, TrackPlayingState } from "./PlayingState";

export interface ControlState {
  clips: ClipPlayingStateByClipId;
  tracks: TrackPlayingStateByTrackId;
}
export type ClipPlayingStateByClipId = Record<string, ClipPlayingState>;
export type TrackPlayingStateByTrackId = Record<string, TrackPlayingState>;
