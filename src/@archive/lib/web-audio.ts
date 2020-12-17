export async function blobToArrayBuffer(blob: Blob) {
  return await new Response(blob).arrayBuffer();
}

type Context = {
  decodeAudioData(array: ArrayBuffer): Promise<AudioBuffer>;
};

export async function blobToBuffer(ctx: Context, blob: Blob) {
  const arrayBuffer = await blobToArrayBuffer(blob);
  return await ctx.decodeAudioData(arrayBuffer);
}
