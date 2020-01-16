import debug from "debug";
import { Audioset, Clip } from "../../audioset";
import { TimeManager } from "../TimeManager";
import { ControlCommand } from "./ControlCommand";
import { ControlState } from "./ControlState";
import { ControlStateManager } from "./ControlStateManager";
import { KeyboardController } from "./KeyboardController";

const log = debug("atpls:control");

export interface ControlListener {
  onControlStateChanged: (state: ControlState) => void;
  onControlCommand: (command: ControlCommand) => void;
}

export interface PlayerControl {
  readonly keyboard: KeyboardController;
  getState(): ControlState;
  toggleClip(clipId: string, time: number): void;
  stopClip(clipId: string, time: number): void;
  startClip(clipId: string, time: number): void;
  stopAll(time: number): void;
}

/**
 * Controls the playing state of clips and tracks
 *
 * It uses a listener for side effects (using commands) and state changes
 */
export class AudiosetControl implements PlayerControl {
  public readonly keyboard: KeyboardController;
  private time: TimeManager;
  private commands: ControlCommand[] = [];
  private manager = new ControlStateManager();

  constructor(audioset: Audioset, private listener: ControlListener) {
    log("create control %s", audioset.meta.title);
    this.time = new TimeManager(audioset.audio);
    this.keyboard = new KeyboardController(audioset, this);
    audioset.clips.forEach((clip: Clip) => this.manager.addClip(clip));
    audioset.tracks.forEach(track => this.manager.addTrack(track));
  }

  public toggleClip(clipId: string, time: number) {
    const clipState = this.manager.getClipState(clipId);
    if (!clipState) {
      return;
    } else if (clipState.status === "stopped") {
      this.startClip(clipId, time);
    } else if (clipState.status === "playing") {
      this.stopClip(clipId, time);
    }
  }

  /**
   * Start a clip
   * @param clipId
   */
  public startClip(clipId: string, time: number) {
    const clipState = this.manager.getClipState(clipId);
    if (!clipState || clipState.status === "playing") {
      return;
    }

    time = this.time.startTime(time);
    log("start clip %s %o", clipId, time);

    const trackId = this.manager.getTrackIdOfClip(clipId);
    const sameTrackClipIds = this.manager.getClipIdsOfTrack(trackId);
    sameTrackClipIds.forEach(trackClipId =>
      this.stopClipCommand(trackClipId, time),
    );
    this.startTrackCommand(trackId, time);
    this.startClipCommand(clipId, time);
    this.sendCommandsAndFireStateChange();
  }

  /**
   * Stops a clip
   */
  public stopClip(clipId: string, time: number) {
    const clipState = this.manager.getClipState(clipId);
    if (!clipState || clipState.status === "stopped") {
      return;
    }

    time = this.time.stopTime(time);
    log("stop clip %s %o", clipId, time);

    const trackId = this.manager.getTrackIdOfClip(clipId);

    this.stopClipCommand(clipId, time);
    this.stopTrackCommand(trackId, time);
    this.sendCommandsAndFireStateChange();
  }

  /**
   * Stops all clips
   */
  public stopAll(time: number) {
    this.manager
      .getAllClipIds()
      .forEach(clipId => this.stopClipCommand(clipId, time));
    this.manager
      .getAllTrackIds()
      .forEach(trackId => this.stopTrackCommand(trackId, time));
    this.sendCommandsAndFireStateChange();
  }

  public getState() {
    return this.manager.getState();
  }

  //// PRIVATE ////
  private sendCommandsAndFireStateChange() {
    this.commands.forEach(command => {
      this.listener.onControlCommand(command);
    });
    this.commands = [];

    this.listener.onControlStateChanged(this.getState());
  }

  private startClipCommand(clipId: string, time: number) {
    const clipState = this.manager.getClipState(clipId);
    if (clipState.status === "playing") {
      return;
    }

    this.manager.setClipState(clipId, { status: "playing" });
    this.commands.push({ command: "startClip", clipId, time });
  }

  private stopClipCommand(clipId: string, time: number) {
    const clipState = this.manager.getClipState(clipId);
    if (clipState.status === "stopped") {
      return;
    }

    this.manager.setClipState(clipId, { status: "stopped" });
    this.commands.push({ command: "stopClip", clipId, time });
  }

  private startTrackCommand(trackId: string, time: number) {
    const trackState = this.manager.getTrackState(trackId);
    if (trackState.status === "playing") {
      return;
    }

    this.manager.setTrackState(trackId, {
      status: "playing",
      volume: trackState.volume,
    });
    this.commands.push({ command: "startTrack", trackId, time });
  }

  private stopTrackCommand(trackId: string, time: number) {
    const trackState = this.manager.getTrackState(trackId);
    if (trackState.status === "stopped") {
      return;
    }

    this.manager.setTrackState(trackId, {
      status: "stopped",
      volume: trackState.volume,
    });
    this.commands.push({ command: "stopTrack", trackId, time });
  }
}
