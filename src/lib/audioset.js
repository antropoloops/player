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
    audioset.clipIndex = audioset.clips.reduce((index, clip) => {
      index[clip.id] = clip;
      return index;
    }, {});
    // FIXME: legacy
    audioset.clips = audioset.clipIndex;
  } else {
    audioset.clipIndex = audioset.clips;
    audioset.clipList = Object.keys(audioset.clips).map(
      id => audioset.clips[id]
    );
  }
  audioset.tracks.forEach(track => {
    track.clipList = track.clipIds.map(id => audioset.clipIndex[id]);
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

export function preloadImages(audioset) {
  // const urls = audioset.clipList.map(clip => clip.coverUrl);
  // TODO: implement image preloading
  // return Promise.all(urls.map(url => fetch(url)));
}

export function fetchResources(type, audioset) {}

export function createResourceUrl(type, audioset, clipId) {
  if (!audioset.resources) return;
  const pattern = audioset.resources[type] || "";
  const url = pattern.replace("{{id}}", clipId);
  return url;
}
