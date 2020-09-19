import { TickAction } from "./actions";
import {
  StartClip,
  StopClip,
  StartTrack,
  StopTrack,
  PlayerCommand,
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
    } else {
      // stop the clip
      commands.push(StopClip(time, trackId, clipId));
      // stop the track
      if (tracks[trackId]) {
        commands.push(StopTrack(time, trackId));
      }
    }
  }

  return commands;
}

export default function monophonic(
  state: PlayerState,
  action: TickAction
): PlayerState {
  const { time } = action;
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  const commands = state.commands;
  const lastCommand = commands.length;

  state.queued.forEach((event) => {
    const { clipId, trackId } = event;
    const start = event.trigger === "on";

    if (start) {
      // stop all other
      Object.keys(clips).forEach((clipId) => {
        if (clips[clipId].playing) {
          clips[clipId] = { playing: false, time };
          commands.push(StopClip(time, trackId, clipId));
        }
      });

      // stop all tracks
      const currentTrack = trackId;
      Object.keys(tracks).forEach((trackId) => {
        if (trackId !== currentTrack && tracks[trackId].playing) {
          tracks[trackId] = { playing: false, time };
          commands.push(StopTrack(time, trackId));
        }
      });

      // start clip
      clips[clipId] = { playing: true, time };
      commands.push(StartClip(time, trackId, clipId));
      // start track
      if (!tracks[trackId]?.playing) {
        tracks[trackId] = { playing: true, time };
        commands.push(StartTrack(time, trackId));
      }
    } else {
      // stop the clip
      clips[clipId] = { playing: false, time };
      commands.push(StopClip(time, trackId, clipId));
      // stop the track
      if (tracks[trackId]) {
        tracks[trackId] = { playing: false, time };
        commands.push(StopTrack(time, trackId));
      }
    }
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
