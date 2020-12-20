export function createOfflineAudioContext() {
  return new OfflineAudioContext(2, 44100 * 40, 44100);
}

export async function blobToArrayBuffer(blob: Blob) {
  return await new Response(blob).arrayBuffer();
}

export async function blobToBuffer(context: AudioContext, blob: Blob) {
  const arrayBuffer = await blobToArrayBuffer(blob);
  return await context.decodeAudioData(arrayBuffer);
}
