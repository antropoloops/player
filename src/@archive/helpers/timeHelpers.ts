export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 60 / 60);
  const m = Math.floor((seconds / 60) % 60);
  const s = Math.floor(seconds % 60);
  return `${h}:${m}:${s}`.replace(/\b(\d)\b/g, "0$1");
}
