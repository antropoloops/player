export const mapClips = ({ clips }, fn) =>
  Object.keys(clips).map(id => fn(clips[id]));

export function fetchAudioset(audiosetId) {
  return fetch(`/audiosets/${audiosetId}.audioset.json`)
    .then(response => response.json())
    .then(audioset => migrateAudioset(audioset));
}

export function migrateAudioset(audioset) {
  if (audioset.migrated) return audioset;

  audioset.migrated = true;
  mapClips(audioset, clip => {
    clip.id = clip.name;
    clip.audioUrl = createResourceUrl("audio", audioset, clip.id);
    clip.coverUrl = createResourceUrl("cover", audioset, clip.id);
  });
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
  // TODO: implement image preloading
  return fetchResources("cover", audioset);
}

export function fetchResources(type, audioset) {
  return Promise.all(
    getResourceClips(type, audioset).map(clip => fetch(clip.resourceUrl))
  );
}

function getResourceClips(type, audioset) {
  return Object.keys(audioset.clips).map(clipId => {
    const clip = audioset.clips[clipId];
    clip.resourceUrl = createResourceUrl(type, audioset, clipId);
    return clip;
  });
}

export function createResourceUrl(type, audioset, clipId) {
  const pattern = audioset.resources[type] || "";
  const url = pattern.replace("{{id}}", clipId);
  return url;
}
