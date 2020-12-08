import { safeFindTrackById, Track } from "../audioset";
import { TickAction } from "./actions";
import {
  StartClip,
  StopClip,
  StartTrack,
  StopTrack,
  PlayerCommand,
  runCommand,
} from "./commands";
import { PlayerEvent } from "./events";
import { PlayerState } from "./state";

const STOP_WHEN_ALL_STOPPED = true;

export function process(
  time: number,
  event: PlayerEvent,
  state: PlayerState,
  trackDataById: (trackId: string) => Track
) {
  const commands: PlayerCommand[] = [];
  const { clips, tracks } = state;

  if (event.type === "clip") {
    const { clipId, trackId, trigger } = event;

    if (trigger === "on") {
      commands.push(StartClip(time, trackId, clipId));

      // stop other clips in the same track
      const track = trackDataById(trackId);
      track.clipIds.forEach((clipId) => {
        if (clipId !== event.clipId && clips[clipId]?.playing) {
          commands.push(StopClip(time, trackId, clipId));
        }
      });
      // start the track
      if (!tracks[trackId]?.playing) {
        commands.push(StartTrack(time, trackId));
      }
    } else if (trigger === "off") {
      // stop the clip
      commands.push(StopClip(time, trackId, clipId));
      // stop the track
      if (tracks[trackId]?.playing) {
        commands.push(StopTrack(time, trackId));
      }
    }
  } else if (event.type === "track") {
    const { trackId, trigger } = event;
    const track = trackDataById(trackId);
    if (trigger === "off") {
      commands.push(StopTrack(time, trackId));
      track.clipIds.forEach((clipId) => {
        if (clips[clipId]?.playing) {
          commands.push(StopClip(time, trackId, clipId));
        }
      });
    }
  }
  return commands;
}

export default function polyphonic(
  state: PlayerState,
  action: TickAction
): PlayerState {
  const startAt = state.startAt || action.time;

  const bpm = state.audioset.audio.bpm;
  const quantize = state.audioset.audio.quantize;
  const quantizedOffset =
    startAt === action.time
      ? 0
      : quantizeTime(bpm, action.time, startAt, quantize);

  if (quantizedOffset > 2 * action.length) return state;

  const time = action.time + quantizedOffset;

  const lastCommand = state.commands.length;

  // TODO: repeated code in polyphonic. Idea: commands = createCommands(state.queued, process(time, state))
  const commands = state.queued.reduce((commands, event) => {
    return [
      ...commands,
      ...process(time, event, state, (trackId: string) =>
        safeFindTrackById(state.audioset, trackId)
      ),
    ];
  }, [] as PlayerCommand[]);
  // TODO: abstract code
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  commands.forEach((command) => {
    runCommand(command, clips, tracks);
    state.commands.push(command);
  });

  const shouldStop =
    STOP_WHEN_ALL_STOPPED &&
    !Object.values(tracks).find((track) => track.playing);

  const lastTickAt = time;
  return {
    ...state,
    startAt: shouldStop ? 0 : startAt,
    lastTickAt,
    clips,
    tracks,
    queued: [],
    lastCommand,
  };
}

/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} bpm
 * @param {*} now
 * @param {*} startedAt
 * @param {*} beats
 */
function quantizeTime(
  bpm: number,
  now: number,
  startedAt: number,
  beats = 1
): number {
  const factor = bpm / (60 * beats);
  const absolute = now - startedAt;
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  return offsetTime;
}
