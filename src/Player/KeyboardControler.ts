import { Audioset } from "../Audioset";

export interface Control {
  startClip(clipId: string, time: number): void;
  stopClip(clipId: string, time: number): void;
}

export class KeyboardControler {
  public active: boolean = false;
  public pressed: Record<string, boolean> = {};
  public clipIdToKey: Record<string, string> = {};
  public keyToClipId: Record<string, string | undefined> = {};

  constructor(audioset: Audioset, private control: Control) {
    audioset.clips.forEach(clip => {
      const key = clip.keyMap.toUpperCase();
      this.clipIdToKey[clip.id] = key;
      this.keyToClipId[key] = clip.id;
    });
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
    if (this.pressed[key]) {
      return;
    }
    this.pressed[key] = true;

    const clipId = this.keyToClipId[key];
    if (clipId) {
      this.control.startClip(clipId, 0);
    }
  }
  public keyUp(key: string) {
    if (!this.active) {
      return;
    }

    key = key.toUpperCase();
    this.pressed[key] = false;

    const clipId = this.keyToClipId[key];
    if (clipId) {
      this.control.stopClip(clipId, 0);
    }
  }
}
