export function formatTime(seconds?: number, placeholder = "--:--:--") {
  if (seconds === undefined) {
    return placeholder;
  }

  const h = Math.floor(seconds / 60 / 60);
  const m = Math.floor((seconds / 60) % 60);
  const s = Math.floor((seconds % 60) * 100) / 100;
  const raw = h ? `${h}:${m}:${s}` : `${m}:${s}`;
  return raw.replace(/\b(\d)\b/g, "0$1");
}
