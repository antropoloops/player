const BEATS = 1;

/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} now
 * @param {*} startedAt
 * @param {*} bpm
 * @param {*} beats
 */
export default function nextBeatOffset(bpm, now, startedAt, beats = BEATS) {
  if (!startedAt) return 0;
  const factor = bpm / (60 * beats);
  const absolute = now - startedAt;
  if (absolute === 0) return 0;
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  console.log("offset time!", offsetTime);
  return offsetTime;
}
