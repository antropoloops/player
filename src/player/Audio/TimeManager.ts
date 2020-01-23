import debug from "debug";
import { IAudioContext } from "standardized-audio-context";
import { getActiveAudioContext } from "./AudioContext";

const log = debug("atpls:time");

interface Config {
  bpm: number;
  quantize: number;
}

export class TimeManager {
  public bpm: number;
  public quantize: number;
  private count: number = 0;
  private startedAt: number = 0;
  private context?: IAudioContext;

  constructor(config: Config) {
    log("time %o", config);
    this.bpm = config.bpm;
    this.quantize = config.quantize || 1;
    getActiveAudioContext().then(ctx => (this.context = ctx));
  }

  public startTime(time: number) {
    if (!this.context) {
      return time;
    }

    const startTime = this.nextTime(time);
    this.count += 1;

    if (this.count === 1) {
      this.startedAt = startTime;
    }
    return startTime;
  }

  public stopTime(time: number) {
    if (!this.context) {
      return time;
    }

    time = this.nextTime(time);
    this.count -= 1;

    if (this.count === 0) {
      this.startedAt = 0;
    }
    return time;
  }

  private nextTime(time: number) {
    if (!this.context) {
      return time;
    }

    const now = this.context.currentTime;
    if (this.startedAt === 0) {
      return now;
    }

    return now + quantizeTime(this.bpm, now, this.startedAt, this.quantize);
  }
}
const BEATS = 1;

/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} bpm
 * @param {*} now
 * @param {*} startedAt
 * @param {*} beats
 */
export function quantizeTime(
  bpm: number,
  now: number,
  startedAt: number,
  beats = BEATS,
): number {
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
