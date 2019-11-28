import debug from "debug";

let context: AudioContext | undefined;

const log = debug("atpls:context");

/**
 * @see https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
 */
export async function getAudioContext(): Promise<AudioContext> {
  context = context || createAudioContext();

  if (context.state !== "running" && context.resume) {
    log("waiting for context...");
    return context
      .resume()
      .then(() => startAudioContext(context as AudioContext));
  } else {
    return context;
  }
}

function createAudioContext(): AudioContext {
  log("create context");
  const ctx = new ((window as any).AudioContext ||
    (window as any).webkitAudioContext)() as AudioContext;
  return ctx;
}

function startAudioContext(ctx: AudioContext): AudioContext {
  log("start context");
  // iOS hack. See https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
  const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
  return ctx;
}
