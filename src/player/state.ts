import { Audioset, EmptyAudioset } from "../audioset";
import { PlayerCommand } from "./commands";
import { StatusById } from "./status";
import { PlayerEvent } from "./events";

export type PlayerState = {
  startAt: number;
  lastTickAt: number;
  audioset: Audioset;
  queued: Array<PlayerEvent>;
  clips: StatusById;
  tracks: StatusById;
  commands: PlayerCommand[];
  lastCommand: number;
};

export function createInitialState(audioset?: Audioset): PlayerState {
  return {
    startAt: 0,
    lastTickAt: 0,
    audioset: audioset || EmptyAudioset,
    queued: [],
    clips: {},
    tracks: {},
    commands: [],
    lastCommand: 0,
  };
}
