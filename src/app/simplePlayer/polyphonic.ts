import { PlayerState, TickAction } from "./types";
import { StartClip, StopClip, StartTrack, StopTrack } from "./commands";

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
  const lastTickAt = time;

  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  const trackDataById = state.audioset.index.trackById;
  const commands = state.commands;

  state.queued.forEach((action) => {
    const { clipId, trackId, playing } = action;

    if (playing) {
      // start clip
      clips[clipId] = { playing: true, time };
      commands.push(StartClip(time, trackId, clipId));

      // stop other clips in the same track
      const trackData = trackDataById[trackId];
      trackData.clipIds.forEach((clipId) => {
        if (clipId !== action.clipId && clips[clipId]?.playing) {
          clips[clipId] = { playing: false, time };
          commands.push(StopClip(time, trackId, clipId));
        }
      });
      // start the track
      if (!tracks[trackId]?.playing) {
        tracks[trackId] = { playing: true, time };
        commands.push(StartTrack(time, trackId));
      }
    } else {
      // stop the clip
      clips[clipId] = { playing: false, time };
      commands.push(StopClip(time, trackId, clipId));
      // stop the track
      if (tracks[trackId]?.playing) {
        tracks[trackId] = { playing: false, time };
        commands.push(StopTrack(time, trackId));
      }
    }
  });
  return {
    ...state,
    startAt,
    lastTickAt,
    clips,
    tracks,
    queued: [],
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
