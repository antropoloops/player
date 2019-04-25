const BEATS = 1;

export default function nextBeat(now, startedAt, bpm) {
  return now + nextBeatOffset(now, startedAt, bpm);
}

/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} now
 * @param {*} startedAt
 * @param {*} bpm
 * @param {*} beats
 */
export function nextBeatOffset(now, startedAt, bpm, beats = BEATS) {
  if (!startedAt) return 0;
  const factor = bpm / (60 * beats);
  const absolute = now - startedAt;
  if (absolute === 0) return 0;
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  return offsetTime;
}
