export function createOfflineAudioContext() {
  return new OfflineAudioContext(2, 44100 * 40, 44100);
}

export async function blobToArrayBuffer(blob: Blob) {
  return await new Response(blob).arrayBuffer();
}

export async function blobToBuffer(blob: Blob) {
  const arrayBuffer = await blobToArrayBuffer(blob);
  const context = createOfflineAudioContext();
  return await context.decodeAudioData(arrayBuffer);
}
