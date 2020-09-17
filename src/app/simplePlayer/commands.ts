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
