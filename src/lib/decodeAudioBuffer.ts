import { IAudioContext } from "standardized-audio-context";

/**
 * Fetch an AudioBuffer from a fetch response
 */
export default async function decodeAudioBuffer(
  response: Response,
  context: IAudioContext
) {
  const arrayBuffer = await response.arrayBuffer();
  return decodeArrayBuffer(context, arrayBuffer);
}

function decodeArrayBuffer(
  ctx: IAudioContext,
  buffer: ArrayBuffer
): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(buffer, resolve, reject);
  });
}
