import debug from "debug";

const log = debug("atpls:keyboard");

class Keyboard {
  constructor() {
    this.active = true;
    this.pressed = {};
    this.keyToClip = {};
    this.clipToKey = {};
  }

  setActive(isActive) {
    log("Active %o", isActive);
    this.active = isActive;
  }

  getKey(clipId) {
    return this.clipToKey[clipId];
  }

  setKey(clipId, key) {
    const oldKey = this.clipToKey[clipId];
    if (oldKey) this.keyToClip[oldKey] = undefined;
    key = key.toUpperCase();
    this.keyToClip[key] = clipId;
    this.clipToKey[clipId] = key;
  }

  attach(events) {
    log("attach");
    const onKeyDown = e => {
      if (!this.active) return;

      const key = e.key.toUpperCase();
      if (this.pressed[key]) return;
      this.pressed[key] = true;

      log("Key Down", key);

      const clip = this.keyToClip[key];
      if (clip) events.onPress(clip);
    };

    const onKeyUp = e => {
      if (!this.active) return;

      const key = e.key.toUpperCase();
      this.pressed[key] = false;

      const clip = this.keyToClip[key];
      if (clip) events.onRelease(clip);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }
}

export default function createKeyboard(audioset) {
  const keyboard = new Keyboard();
  buildKeymap(keyboard, audioset);
  return keyboard;
}

function buildKeymap(keyboard, audioset) {
  return audioset.clipList.forEach(clip => keyboard.setKey(clip.id, clip.key));
}
