import { Audioset } from "../audioset";

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

type ClipIdToKey = Record<string, string>;

function storeConfig(id: string, map: ClipIdToKey) {
  const encoded = JSON.stringify(map);
  localStorage.setItem(`AUDIOSET_KEYMAP_${id}`, encoded);
}

function loadConfig(id: string): ClipIdToKey | undefined {
  const encoded = localStorage.getItem(`AUDIOSET_KEYMAP_${id}`);
  if (!encoded) return;

  try {
    return JSON.parse(encoded);
  } catch {
    return undefined;
  }
}

const SAVE_KEYS_ENABLED = false;

export class KeyboardController {
  private audiosetId: string;
  private active: boolean = false;
  private pressed: Record<string, boolean> = {};
  private clipIdToKey: ClipIdToKey = {};
  private keyToClipId: Record<string, string | undefined> = {};
  private mapMode?: MapMode = undefined;

  constructor(audioset: Audioset, private control: Control) {
    this.audiosetId = audioset.id;
    const prevConfig = loadConfig(this.audiosetId);
    if (SAVE_KEYS_ENABLED && prevConfig) {
      this.clipIdToKey = prevConfig;
      Object.keys(prevConfig).forEach((clipId) => {
        const key = prevConfig[clipId];
        this.keyToClipId[key] = clipId;
      });
    } else {
      audioset.clips.forEach((clip) => {
        const key = (clip.keyMap || "").toUpperCase();
        this.clipIdToKey[clip.id] = key;
        this.keyToClipId[key] = clip.id;
      });
      storeConfig(this.audiosetId, this.clipIdToKey);
    }
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
    storeConfig(this.audiosetId, this.clipIdToKey);
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
