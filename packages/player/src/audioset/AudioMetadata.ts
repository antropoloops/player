export interface AudioMetadata {
  bpm: number;
  defaults: {
    loop: true;
  };
  signature: [number, number];
  trackMaxVoices: number;
  quantize: number;
}
