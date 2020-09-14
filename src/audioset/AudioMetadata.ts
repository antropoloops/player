export interface AudioMetadata {
  bpm: number;
  defaults: {
    loop: true;
  };
  mode: string;
  signature: [number, number];
  trackMaxVoices: number;
  quantize: number;
}
