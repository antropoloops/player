import { Audioset } from "../../audioset";
import { PlayerCommand } from "./commands";

export type PlayStatus = {
  playing: boolean;
  time: number;
  dirty?: boolean;
};

export type InitAction = { type: "init"; audioset?: Audioset };
export type TriggerAction = {
  type: "trigger";
  playing: boolean;
  clipId: string;
  trackId: string;
};
export type TickAction = { type: "tick"; time: number; length: number };

export type PlayerAction = InitAction | TriggerAction | TickAction;

type TrackId = string;
type ClipId = string;

export type PlayerState = {
  startAt: number;
  lastTickAt: number;
  audioset: Audioset;
  queued: Array<TriggerAction>;
  clips: Record<ClipId, PlayStatus>;
  tracks: Record<TrackId, PlayStatus>;
  commands: PlayerCommand[];
};
