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

// THIS IS HOW SHOULD BE: process and return commands
export function process(time: number, event: PlayerEvent, state: PlayerState) {
  const commands: PlayerCommand[] = [];
  const { clips, tracks } = state;

  if (event.type === "clip") {
    const { trigger, clipId, trackId } = event;
    if (trigger === "on") {
      // stop all other
      Object.keys(clips).forEach((clipId) => {
        if (clips[clipId].playing) {
          commands.push(StopClip(time, trackId, clipId));
        }
      });

      // stop all tracks
      const currentTrack = trackId;
      Object.keys(tracks).forEach((trackId) => {
        if (trackId !== currentTrack && tracks[trackId].playing) {
          commands.push(StopTrack(time, trackId));
        }
      });

      // start clip
      commands.push(StartClip(time, trackId, clipId));
      // start track
      if (!tracks[trackId]?.playing) {
        commands.push(StartTrack(time, trackId));
      }
    } else if (trigger === "off") {
      // stop the clip
      commands.push(StopClip(time, trackId, clipId));
      // stop the track
      if (tracks[trackId]) {
        commands.push(StopTrack(time, trackId));
      }
    }
  } else if (event.type === "track") {
    const { trigger, trackId } = event;
    if (trigger === "off") {
      commands.push(StopTrack(time, trackId));
      // it's monophonic, so only one clip is playin
      Object.keys(clips).forEach((clipId) => {
        if (clips[clipId].playing) {
          commands.push(StopClip(time, trackId, clipId));
        }
      });
    }
  }

  return commands;
}

export default function monophonic(
  state: PlayerState,
  action: TickAction
): PlayerState {
  const { time } = action;
  const lastCommand = state.commands.length;

  // TODO: repeated code in polyphonic. Idea: commands = createCommands(state.queued, process(time,))
  const commands = state.queued.reduce((commands, event) => {
    return [...commands, ...process(time, event, state)];
  }, [] as PlayerCommand[]);
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  commands.forEach((command) => {
    runCommand(command, clips, tracks);
    state.commands.push(command);
  });

  const lastTickAt = time;
  return {
    ...state,
    lastTickAt,
    clips,
    tracks,
    queued: [],
    lastCommand,
  };
}
