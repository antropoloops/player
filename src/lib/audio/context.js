let ctx;

export default function context() {
  if (!ctx) ctx = createAudioContext();
  return ctx;
}

function createAudioContext() {
  const clazz = window.AudioContext || window.webkitAudioContext;
  const ctx = new clazz();
  console.log("create context", ctx);
  return ctx;
}

// https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos
export function unlockAudioContext(ctx = context()) {
  if (ctx.state !== "suspended") return;
  const b = document.body;
  const events = ["touchstart", "touchend", "mousedown", "keydown"];
  events.forEach(e => b.addEventListener(e, unlock, false));

  function unlock() {
    console.log("Unlocking AudioContext...");
    ctx.resume().then(clean);
  }
  function clean() {
    console.log("AudioContext unlocked!");
    events.forEach(e => b.removeEventListener(e, unlock));
  }
}
