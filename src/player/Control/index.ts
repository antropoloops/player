import debug from "debug";
import { Audioset, Clip } from "../../audioset";
import { KeyboardControler } from "./../KeyboardControler";

const log = debug("atpls:control");

export type PlayingState = "stopped" | "playing"; // | "playScheduled" |  "stopScheduled";

export interface ClipPlayingState {
  readonly state: PlayingState;
}

export interface TrackPlayingState {
  readonly state: PlayingState;
  readonly volume: number;
}

export interface StartClip {
  command: "startClip";
  clipId: string;
  time: number;
}
export interface StopClip {
  command: "stopClip";
  clipId: string;
  time: number;
}
export interface StartTrack {
  command: "startTrack";
  trackId: string;
  time: number;
}
export interface StopTrack {
  command: "stopTrack";
  trackId: string;
  time: number;
}

export type ControlCommand = StartClip | StopClip | StartTrack | StopTrack;

type ClipPlayingStateByClipId = Record<string, ClipPlayingState>;
type TrackPlayingStateByTrackId = Record<string, TrackPlayingState>;

export interface ControlState {
  playingClipsCount: number;
  playingTracksCount: number;
  clips: ClipPlayingStateByClipId;
  tracks: TrackPlayingStateByTrackId;
}

export interface ControlListener {
  onControlStateChanged: (state: ControlState) => void;
  onControlCommand: (command: ControlCommand) => void;
}

/**
 * Controls the playing state of clips and tracks
 */
export class AudiosetControl {
  public readonly keyboard: KeyboardControler;
  private clipStateByClipId: ClipPlayingStateByClipId = {};
  private trackStateByTrackId: TrackPlayingStateByTrackId = {};
  private clipIdsOfTrack: Record<string, string[]> = {};
  private trackIdOfClip: Record<string, string> = {};
  private commands: ControlCommand[] = [];
  private playingClipsCount: number = 0;
  private playingTracksCount: number = 0;

  constructor(audioset: Audioset, private listener: ControlListener) {
    log("create control");
    this.keyboard = new KeyboardControler(audioset, this);
    audioset.clips.forEach((clip: Clip) => {
      this.clipStateByClipId[clip.id] = { state: "stopped" };
      this.trackIdOfClip[clip.id] = clip.trackId;
    });
    audioset.tracks.forEach(track => {
      const volume = track.volume || 1;
      this.trackStateByTrackId[track.id] = { state: "stopped", volume };
      this.clipIdsOfTrack[track.id] = track.clipIds;
    });
  }

  public toggleClip(clipId: string, time: number) {
    const clipState = this.clipStateByClipId[clipId];
    if (!clipState) {
      return;
    } else if (clipState.state === "stopped") {
      this.startClip(clipId, time);
    } else if (clipState.state === "playing") {
      this.stopClip(clipId, time);
    }
  }

  /**
   * Start a clip
   * @param clipId
   */
  public startClip(clipId: string, time: number) {
    const clipState = this.clipStateByClipId[clipId];
    if (!clipState || clipState.state === "playing") {
      return;
    }

    const trackId = this.trackIdOfClip[clipId];
    const sameTrackClipIds = this.clipIdsOfTrack[trackId];
    sameTrackClipIds.forEach(trackClipId =>
      this.stopClipCommand(trackClipId, time),
    );
    this.startTrackCommand(trackId, time);
    this.startClipCommand(clipId, time);
    this.sendCommands();
  }

  /**
   * Stops a clip
   */
  public stopClip(clipId: string, time: number) {
    const clipState = this.clipStateByClipId[clipId];
    if (!clipState || clipState.state === "stopped") {
      return;
    }

    const trackId = this.trackIdOfClip[clipId];

    this.stopClipCommand(clipId, time);
    this.stopTrackCommand(trackId, time);
    this.sendCommands();
  }

  /**
   * Stops all clips
   */
  public stopAll(time: number) {
    Object.keys(this.clipStateByClipId).forEach(clipId =>
      this.stopClipCommand(clipId, time),
    );
    Object.keys(this.trackStateByTrackId).forEach(trackId =>
      this.stopTrackCommand(trackId, time),
    );
    this.sendCommands();
  }

  public getState(): ControlState {
    return {
      playingClipsCount: this.playingClipsCount,
      playingTracksCount: this.playingTracksCount,
      clips: { ...this.clipStateByClipId },
      tracks: { ...this.trackStateByTrackId },
    };
  }

  //// PRIVATE ////
  private sendCommands() {
    this.commands.forEach(command => {
      this.listener.onControlCommand(command);
    });
    this.commands = [];

    this.listener.onControlStateChanged(this.getState());
  }

  private startClipCommand(clipId: string, time: number) {
    if (this.clipStateByClipId[clipId].state === "playing") {
      return;
    }

    this.playingClipsCount += 1;
    this.clipStateByClipId[clipId] = { state: "playing" };
    this.commands.push({ command: "startClip", clipId, time });
  }
  private stopClipCommand(clipId: string, time: number) {
    if (this.clipStateByClipId[clipId].state === "stopped") {
      return;
    }

    this.playingClipsCount -= 1;
    this.clipStateByClipId[clipId] = { state: "stopped" };
    this.commands.push({ command: "stopClip", clipId, time });
  }
  private startTrackCommand(trackId: string, time: number) {
    const trackState = this.trackStateByTrackId[trackId];
    if (trackState.state === "playing") {
      return;
    }

    this.playingTracksCount += 1;
    this.trackStateByTrackId[trackId] = {
      state: "playing",
      volume: trackState.volume,
    };
    this.commands.push({ command: "startTrack", trackId, time });
  }
  private stopTrackCommand(trackId: string, time: number) {
    const trackState = this.trackStateByTrackId[trackId];
    if (trackState.state === "stopped") {
      return;
    }

    this.playingTracksCount -= 1;
    this.trackStateByTrackId[trackId] = {
      state: "stopped",
      volume: trackState.volume,
    };
    this.commands.push({ command: "stopTrack", trackId, time });
  }
}
