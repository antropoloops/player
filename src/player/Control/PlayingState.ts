/**
 * Possible Player states
 */
export type PlayingState = "stopped" | "playing"; // | "playScheduled" |  "stopScheduled";

export interface ClipPlayingState {
  readonly state: PlayingState;
}
export interface TrackPlayingState {
  readonly state: PlayingState;
  readonly volume: number;
}
