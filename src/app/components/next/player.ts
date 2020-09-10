type ClipId = string;
type TrackId = string;

type PlayerConfig = {
  tracks: Record<string, string[]>;
};

export type TrackState = Record<ClipId, ClipState>;

export type ClipState = {
  clipId: ClipId;
  trackId: TrackId;
  state: "start" | "stop";
  time: number;
};

export type PlayerState = {
  _startedAt: number | null;
  config: PlayerConfig;
  tracks: Record<TrackId, TrackState>;
  queued: Record<ClipId, TriggerAction>;
  activeClipIds: string[];
};

type TriggerAction = {
  type: "trigger";
  trigger: "on" | "off" | "toggle";
  trackId: TrackId;
  clipId: ClipId;
};
type RunAction = {
  type: "run";
  commands: readonly Commands[];
};

export type PlayerAction = TriggerAction | RunAction;

export function initialState(): PlayerState {
  return {
    _startedAt: null,
    config: {
      tracks: {},
    },
    tracks: {},
    queued: {},
    activeClipIds: [],
  };
}

const EMPTY = Object.freeze({});

export default function reducer(
  state: PlayerState,
  action: PlayerAction
): PlayerState {
  switch (action.type) {
    case "trigger":
      return { ...state, queued: { ...state.queued, [action.clipId]: action } };
    case "run":
      return runCommands(state, action.commands);
    default:
      return state;
  }
}

function runCommands(
  state: PlayerState,
  commands: readonly Commands[]
): PlayerState {
  const queued = {};

  const tracks = { ...state.tracks };
  for (const cmd of commands) {
    tracks[cmd.trackId] = tracks[cmd.trackId] || {};
    tracks[cmd.trackId][cmd.clipId] = cmd;
  }

  const activeClipIds = [];
  for (const track of Object.values(tracks)) {
    for (const clip of Object.values(track)) {
      if (clip.state === "start") activeClipIds.push(clip.clipId);
    }
  }

  return { ...state, tracks, queued, activeClipIds };
}

const NO_CMDS: readonly Commands[] = Object.freeze([]);

export function tick(time: number, state: PlayerState): readonly Commands[] {
  const triggers = Object.values(state.queued);
  if (triggers.length === 0) return NO_CMDS;

  const commands = [];

  for (const action of triggers) {
    const trackState = state.tracks[action.trackId] || EMPTY;
    const clipState = trackState[action.clipId] || EMPTY;
    const trigger: "on" | "off" =
      action.trigger === "toggle"
        ? clipState.state === "start"
          ? "off"
          : "on"
        : action.trigger;

    if (trigger === "on") {
      commands.push(start(time, action.trackId, action.clipId));
      const runningInSameTrack = Object.values(trackState).find(
        (state) => state.state === "start"
      );
      if (runningInSameTrack) {
        commands.push(
          stop(time, runningInSameTrack.trackId, runningInSameTrack.clipId)
        );
      }
    } else if (trigger === "off") {
      commands.push(stop(time, action.trackId, action.clipId));
    }
  }
  return commands;
}

type StartCmd = {
  state: "start";
  time: number;
  trackId: TrackId;
  clipId: ClipId;
};
type StopCmd = {
  state: "stop";
  time: number;
  trackId: TrackId;
  clipId: ClipId;
};
type Commands = StartCmd | StopCmd;

function start(time: number, trackId: TrackId, clipId: ClipId): StartCmd {
  return { state: "start", time, clipId, trackId };
}
function stop(time: number, trackId: TrackId, clipId: ClipId): StopCmd {
  return { state: "stop", time, clipId, trackId };
}
