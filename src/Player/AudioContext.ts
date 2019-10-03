import debug from "debug";
export let context: AudioContext | undefined;

const log = debug("atpls:context");
export async function getAudioContext(): Promise<AudioContext> {
  if (context) {
    return context;
  }

  context = createAudioContext();
  if (context.resume) {
    log("trying to resume...");
    await context.resume();
    log("resumed!");
  }
  log("context ready!");
  return context;
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
