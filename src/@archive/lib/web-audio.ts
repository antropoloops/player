export async function blobToArrayBuffer(ctx: AudioContext, blob: Blob) {
  return await new Response(blob).arrayBuffer();
}

export async function blobToBuffer(ctx: AudioContext, blob: Blob) {
  const arrayBuffer = await blobToArrayBuffer(ctx, blob);
  return await ctx.decodeAudioData(arrayBuffer);
}
