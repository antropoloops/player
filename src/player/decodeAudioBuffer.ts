import { IAudioContext } from "standardized-audio-context";
import { getActiveAudioContext } from "./AudioContext";

/**
 * Fetch an AudioBuffer from a fetch response
 */
export async function decodeAudioBuffer(response: Response) {
  const context = await getActiveAudioContext();
  const arrayBuffer = await response.arrayBuffer();
  return decodeArrayBuffer(context, arrayBuffer);
}

function decodeArrayBuffer(
  ctx: IAudioContext,
  buffer: ArrayBuffer,
): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(buffer, resolve, reject);
  });
}
