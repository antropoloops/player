let ctx;

export default function context() {
  if (!ctx) ctx = createAudioContext();
  return ctx;
}

function createAudioContext() {
  const clazz = window.AudioContext || window.webkitAudioContext;
  const ctx = new clazz();
  return ctx;
}

// https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos
export function unlockAudioContext(ctx = context()) {
  if (ctx.state !== "suspended") return Promise.resolve(ctx);
  return new Promise((resolve, reject) => {
    const b = document.body;
    const events = ["touchstart", "touchend", "mousedown", "keydown"];
    events.forEach(e => b.addEventListener(e, unlock, false));

    function unlock() {
      ctx
        .resume()
        .then(clean)
        .then(() => resolve(ctx));
    }
    function clean() {
      events.forEach(e => b.removeEventListener(e, unlock));
    }
  });
}
