export interface Track {
  id: string;
  name: string;
  color: string;
  clipIds: string[];
  position: number;
  volume?: number;
}

export function createEmptyTrack(data: Partial<Track>): Track {
  return {
    id: "",
    name: "",
    color: "",
    clipIds: [],
    position: 0,
    volume: 0,
    ...data,
  };
}
