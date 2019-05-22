import debug from "debug";
import { mapClips } from "../audioset";
import getAudioFormats from "./getAudioFormats";

const log = debug("atpls:fetchAudio");

function decodeArrayBuffer(ctx, buffer) {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(buffer, resolve, reject);
  });
}

export default function fetchAudioBuffers(ctx, audioset, events) {
  log("Start fetch audio %s", audioset.id);
  const formats = getAudioFormats();

  const decode = response =>
    response.arrayBuffer().then(buffer => decodeArrayBuffer(ctx, buffer));

  const loadBuffers = mapClips(audioset, async clip => {
    try {
      if (clip.audioBuffer) return Promise.resolve(clip.audioBuffer);
      const url = getAudioUrl(clip, formats);
      const response = await fetch(url);
      const buffer = await decode(response);

      // audio buffers are stored inside audioset (mutations :-O)
      clip.audioBuffer = buffer;

      return buffer;
    } catch (err) {
      log("Error fetching audio %s %o", clip.id, err);
    }
  });
  return Promise.all(loadBuffers).then(buffers => {
    events.emit("audio:loaded:all", { total: buffers.length });
    return buffers;
  });
}

function getAudioUrl(clip, formats) {
  const urls = clip.resources.audio || {};
  for (const format of formats) {
    if (urls[format]) return urls[format];
  }
  return clip.audioUrl;
}
