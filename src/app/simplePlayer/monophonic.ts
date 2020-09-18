import { TickAction } from "./actions";
import { StartClip, StopClip, StartTrack, StopTrack } from "./commands";
import { PlayerState } from "./state";

export default function monophonic(
  state: PlayerState,
  action: TickAction
): PlayerState {
  const { time } = action;
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  const commands = state.commands;
  const lastCommand = commands.length;

  state.queued.forEach((action) => {
    const { clipId, trackId } = action;
    const start = action.playing;

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
