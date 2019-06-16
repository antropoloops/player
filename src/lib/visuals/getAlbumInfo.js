/**
 * Get URL of a resource, given it's name and source
 * @param {*} name
 * @param {*} source
 */
export function resourceUrl(name, source) {
  if (!source || !source.length) return name;
  const url = source[source.length - 1].replace("{{filename}}", name);
  return url;
}

export default function getAlbumInfo(audioset, name) {
  const clip = audioset.clips[name];
  if (!clip) return;

  const bpm = audioset.meta.bpm || 120;

  return {
    position: clip.lnglat,
    year: clip.year,
    country: clip.country,
    title: clip.title,
    artist: clip.artist,
    album: clip.album,
    trackNumber: clip.trackNum,
    loopend: 1,
    trackVolume: clip.audio.trackVolume || 0.7,
    duration: (60 * clip.audio.beats) / bpm, // clip duration in seconds
    imageUrl: clip.coverUrl,
    trackColor: clip.display.color
  };
}
