import { Audioset } from "../../audioset";
export type InitAction = { type: "init"; audioset?: Audioset };
export type TriggerAction = {
  type: "trigger";
  playing: boolean;
  clipId: string;
  trackId: string;
};
export type TickAction = { type: "tick"; time: number; length: number };

export type PlayerAction = InitAction | TriggerAction | TickAction;
