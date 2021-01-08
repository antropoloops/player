import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

let instance: FFmpeg;

export async function getFFmpeg() {
  if (instance) return instance;

  instance = createFFmpeg({ log: true });
  await instance.load();
  return instance;
}

export type SliceOptions = {
  mimeType: string;
  offset: number;
  duration: number;
};

export async function sliceAudio(input: Blob, region: SliceOptions) {
  const ffmpeg = await getFFmpeg();

  const inputFileName = "input.mp3";
  const outputFileName = "output.mp4";

  ffmpeg.FS("writeFile", inputFileName, await fetchFile(input));
  await ffmpeg.run(
    "-i",
    inputFileName,
    "-ss",
    "" + region.offset,
    "-to",
    "" + (region.offset + region.duration),
    "-c",
    "copy",
    outputFileName
  );

  const output = ffmpeg.FS("readFile", outputFileName);
  return new Blob([output.buffer], { type: "audio/mp4" });
}
