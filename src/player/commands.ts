import { StatusById } from "./status";

export type ClipCommand = {
  type: "clip:start" | "clip:stop";
  time: number;
  clipId: string;
  trackId: string;
};
export type TrackCommand = {
  type: "track:start" | "track:stop";
  time: number;
  trackId: string;
};

export type PlayerCommand = ClipCommand | TrackCommand;

export function runCommand(
  command: PlayerCommand,
  clips: StatusById,
  tracks: StatusById
) {
  const { time } = command;
  switch (command.type) {
    case "clip:start":
      clips[command.clipId] = { playing: true, time };
      break;
    case "clip:stop":
      clips[command.clipId] = { playing: false, time };
      break;
    case "track:start":
      tracks[command.trackId] = { playing: true, time };
      break;
    case "track:stop":
      tracks[command.trackId] = { playing: false, time };
      break;
  }
}

export const StartClip = (
  time: number,
  trackId: string,
  clipId: string
): ClipCommand => ({
  type: "clip:start",
  time,
  clipId,
  trackId,
});

export const StopClip = (
  time: number,
  trackId: string,
  clipId: string
): ClipCommand => ({
  type: "clip:stop",
  time,
  clipId,
  trackId,
});

export const StartTrack = (time: number, trackId: string): TrackCommand => ({
  type: "track:start",
  time,
  trackId,
});

export const StopTrack = (time: number, trackId: string): TrackCommand => ({
  type: "track:stop",
  time,
  trackId,
});
