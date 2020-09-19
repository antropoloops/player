import { Audioset } from "../audioset";
import { PlayerEvent } from "./events";

export type InitAction = { type: "init"; audioset?: Audioset };
export type EventAction = { type: "event"; event: PlayerEvent };
export type TickAction = { type: "tick"; time: number; length: number };

export type PlayerAction = InitAction | EventAction | TickAction;
