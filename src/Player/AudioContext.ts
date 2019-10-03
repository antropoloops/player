import debug from "debug";
export let context: AudioContext | undefined;

const log = debug("atpls:context");

/**
 * @see https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
 */
export async function getAudioContext(): Promise<AudioContext> {
  context = context || createAudioContext();

  if (context.state !== "running" && context.resume) {
    log("waiting for context...");
    return context.resume().then(() => context as AudioContext);
  } else {
    return context;
  }
}

function createAudioContext() {
  log("create context");
  // iOS hack. See https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
  const ctx = new AudioContext();
  const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
  return ctx;
}
