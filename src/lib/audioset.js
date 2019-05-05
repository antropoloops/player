export const mapClips = ({ clips }, fn) =>
  Object.keys(clips).map(id => fn(clips[id]));

export function fetchAudioset(url) {
  return fetch(url)
    .then(response => response.json())
    .then(audioset => migrateAudioset(audioset));
}

export function migrateAudioset(audioset) {
  if (audioset.migrated) return audioset;

  if (Array.isArray(audioset.clips)) {
    audioset.clipList = audioset.clips;
    audioset.clips = audioset.clips.reduce((index, clip) => {
      index[clip.id] = clip;
      return index;
    }, {});
  } else {
    audioset.clipList = Object.keys(audioset.clips).map(
      id => audioset.clips[id]
    );
  }

  audioset.clipList.forEach(clip => {
    clip.id = clip.id || clip.name;
    clip.audioUrl =
      clip.audioUrl || createResourceUrl("audio", audioset, clip.id);
    clip.coverUrl =
      clip.coverUrl || createResourceUrl("cover", audioset, clip.id);
  });

  if (!audioset.keyboard) {
    audioset.keyboard = {
      defaults: { type: "gate" },
      keyMap: audioset.clipList.reduce((map, clip) => {
        map[clip.key] = { clipId: clip.id };
        return map;
      }, {})
    };
  }

  audioset.migrated = true;
  return audioset;
}

export function fetchAudio(ctx, audioset) {
  console.log("fetch audio");
  const decode = response =>
    response.arrayBuffer().then(buffer => ctx.decodeAudioData(buffer));

  const loadBuffers = mapClips(audioset, async clip => {
    if (clip.audioBuffer) return Promise.resolve(clip.audioBuffer);
    const response = await fetch(clip.audioUrl);
    const buffer = await decode(response);
    clip.audioBuffer = buffer;
    return buffer;
  });
  return Promise.all(loadBuffers);
}

export function preloadImages(audioset) {
  const urls = audioset.clipList.map(clip => clip.coverUrl);
  // TODO: implement image preloading
  return Promise.all(urls.map(url => fetch(url)));
}

export function fetchResources(type, audioset) {}

export function createResourceUrl(type, audioset, clipId) {
  const pattern = audioset.resources[type] || "";
  const url = pattern.replace("{{id}}", clipId);
  return url;
}
