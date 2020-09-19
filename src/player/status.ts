export type PlayStatus = {
  playing: boolean;
  time: number;
  dirty?: boolean;
};

export const StoppedStatus: PlayStatus = {
  playing: false,
  time: 0,
  dirty: false,
};

export type StatusById = Record<string, PlayStatus>;
