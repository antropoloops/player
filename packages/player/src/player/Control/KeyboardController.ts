import { Audioset } from "@atpls/audioset";

import debug from "debug";

const log = debug("atpls:keyboard");

export interface Control {
  startClip(clipId: string, time: number): void;
  stopClip(clipId: string, time: number): void;
}

type MapModeCallback = (newKey: string) => void;
interface MapMode {
  clipId: string;
  callback: MapModeCallback;
}

export class KeyboardController {
  private active: boolean = false;
  private pressed: Record<string, boolean> = {};
  private clipIdToKey: Record<string, string> = {};
  private keyToClipId: Record<string, string | undefined> = {};
  private mapMode?: MapMode = undefined;

  constructor(audioset: Audioset, private control: Control) {
    audioset.clips.forEach((clip) => {
      const key = clip.keyMap.toUpperCase();
      this.clipIdToKey[clip.id] = key;
      this.keyToClipId[key] = clip.id;
    });
    this.setActive(true);
  }

  public getKey(clipId: string) {
    return this.clipIdToKey[clipId];
  }

  public setActive(isActive: boolean) {
    this.active = isActive;
    log("setActive %o", isActive);
  }

  public startMapMode(clipId: string, callback: MapModeCallback) {
    this.mapMode = { clipId, callback };
  }
  public stopMapMode() {
    this.mapMode = undefined;
  }

  public setKey(clipId: string, key: string) {
    const oldKey = this.clipIdToKey[clipId];
    if (oldKey) {
      this.keyToClipId[oldKey] = undefined;
    }
    key = key.toUpperCase();
    this.keyToClipId[key] = clipId;
    this.clipIdToKey[clipId] = key;
  }

  public keyDown(key: string) {
    if (!this.active) {
      return;
    }

    key = key.toUpperCase();
    if (this.mapMode) {
      return this.handleKeymapChange(key);
    } else if (this.pressed[key]) {
      return;
    }
    this.pressed[key] = true;

    const clipId = this.keyToClipId[key];
    if (clipId) {
      this.control.startClip(clipId, 0);
    }
  }
  public keyUp(key: string) {
    if (!this.active || this.mapMode) {
      return;
    }

    key = key.toUpperCase();
    this.pressed[key] = false;

    const clipId = this.keyToClipId[key];
    if (clipId) {
      this.control.stopClip(clipId, 0);
    }
  }

  private handleKeymapChange(key: string) {
    if (!this.mapMode) {
      return;
    }
    if (key !== "ESCAPE") {
      this.setKey(this.mapMode.clipId, key);
    }
    this.mapMode.callback(key);
    this.mapMode = undefined;
  }
}
