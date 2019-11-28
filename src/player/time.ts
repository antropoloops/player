const BEATS = 1;

/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} bpm
 * @param {*} now
 * @param {*} startedAt
 * @param {*} beats
 */
export function quantize(
  bpm: number,
  now: number,
  startedAt: number,
  beats = BEATS,
): number {
  if (!startedAt) {
    return 0;
  }

  const factor = bpm / (60 * beats);
  const absolute = now - startedAt;
  if (absolute === 0) {
    return 0;
  }
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  return offsetTime;
}
