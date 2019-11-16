import { getAudioContext } from "./AudioContext";

/**
 * Fetch an AudioBuffer from url
 * @param url
 */
export async function fetchAudioBuffer(url: string): Promise<AudioBuffer> {
  const context = await getAudioContext();
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return decodeArrayBuffer(context, arrayBuffer);
}

function decodeArrayBuffer(
  ctx: AudioContext,
  buffer: ArrayBuffer,
): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(buffer, resolve, reject);
  });
}
