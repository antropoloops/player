export interface Track {
  id: string;
  name: string;
  color: string;
  clipIds: string[];
  position: number;
  volume?: number;
}
