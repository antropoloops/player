import { TickAction } from "./actions";
import { StartClip, StopClip, StartTrack, StopTrack } from "./commands";
import { PlayerState } from "./state";

const STOP_WHEN_ALL_STOPPED = true;

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

  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  const trackDataById = state.audioset.index.trackById;
  const commands = state.commands;
  const lastCommand = commands.length;

  state.queued.forEach((event) => {
    const { clipId, trackId } = event;
    const playing = event.trigger === "on";

    if (playing) {
      // start clip
      clips[clipId] = { playing: true, time };
      commands.push(StartClip(time, trackId, clipId));

      // stop other clips in the same track
      const trackData = trackDataById[trackId];
      trackData.clipIds.forEach((clipId) => {
        if (clipId !== event.clipId && clips[clipId]?.playing) {
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
