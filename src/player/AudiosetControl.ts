import { Audioset, Clip } from "../audioset";
import { KeyboardControler } from "./KeyboardControler";

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
  private clips: ClipPlayingStateByClipId = {};
  private tracks: TrackPlayingStateByTrackId = {};
  private clipIdsOfTrack: Record<string, string[]> = {};
  private trackIdOfClip: Record<string, string> = {};
  private commands: ControlCommand[] = [];
  private clipsCount: number = 0;
  private tracksCount: number = 0;

  constructor(audioset: Audioset, private listener: ControlListener) {
    this.keyboard = new KeyboardControler(audioset, this);
    audioset.clips.forEach((clip: Clip) => {
      this.clips[clip.id] = { state: "stopped" };
      this.trackIdOfClip[clip.id] = clip.trackId;
    });
    audioset.tracks.forEach(track => {
      const volume = track.volume || 1;
      this.tracks[track.id] = { state: "stopped", volume };
      this.clipIdsOfTrack[track.id] = track.clipIds;
    });
  }

  public toggleClip(clipId: string, time: number) {
    const clipState = this.clips[clipId];
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
    const clipState = this.clips[clipId];
    if (!clipState || clipState.state === "playing") {
      return;
    }

    const trackId = this.trackIdOfClip[clipId];
    const sameTrackClipIds = this.clipIdsOfTrack[trackId];
    this._emitChanges(() => {
      sameTrackClipIds.forEach(trackClipId =>
        this._stopClip(trackClipId, time),
      );
      this._startTrack(trackId, time);
      this._startClip(clipId, time);
    });
  }

  /**
   * Stops a clip
   */
  public stopClip(clipId: string, time: number) {
    const clipState = this.clips[clipId];
    if (!clipState || clipState.state === "stopped") {
      return;
    }

    const trackId = this.trackIdOfClip[clipId];

    this._emitChanges(() => {
      this._stopClip(clipId, time);
      this._stopTrack(trackId, time);
    });
  }

  /**
   * Stops all clips
   */
  public stopAll(time: number) {
    this._emitChanges(() => {
      Object.keys(this.clips).forEach(clipId => this._stopClip(clipId, time));
      Object.keys(this.tracks).forEach(trackId =>
        this._stopTrack(trackId, time),
      );
    });
  }

  public getState(): ControlState {
    return {
      playingClipsCount: this.clipsCount,
      playingTracksCount: this.tracksCount,
      clips: { ...this.clips },
      tracks: { ...this.tracks },
    };
  }

  //// PRIVATE ////
  private _emitChanges(changes: () => void) {
    changes();

    this.commands.forEach(command => {
      this.listener.onControlCommand(command);
    });
    this.commands = [];

    this.listener.onControlStateChanged(this.getState());
  }

  private _startClip(clipId: string, time: number) {
    if (this.clips[clipId].state === "playing") {
      return;
    }

    this.clipsCount += 1;
    this.clips[clipId] = { state: "playing" };
    this.commands.push({ command: "startClip", clipId, time });
  }
  private _stopClip(clipId: string, time: number) {
    if (this.clips[clipId].state === "stopped") {
      return;
    }

    this.clipsCount -= 1;
    this.clips[clipId] = { state: "stopped" };
    this.commands.push({ command: "stopClip", clipId, time });
  }
  private _startTrack(trackId: string, time: number) {
    const trackState = this.tracks[trackId];
    if (trackState.state === "playing") {
      return;
    }

    this.tracksCount += 1;
    this.tracks[trackId] = { state: "playing", volume: trackState.volume };
    this.commands.push({ command: "startTrack", trackId, time });
  }
  private _stopTrack(trackId: string, time: number) {
    const trackState = this.tracks[trackId];
    if (trackState.state === "stopped") {
      return;
    }

    this.tracksCount -= 1;
    this.tracks[trackId] = { state: "stopped", volume: trackState.volume };
    this.commands.push({ command: "stopTrack", trackId, time });
  }
}
