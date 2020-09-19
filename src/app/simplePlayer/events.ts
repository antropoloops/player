// Start or stop a clip
export type ClipEvent = {
  type: "clip";
  trigger: "on" | "off";
  clipId: string;
  trackId: string;
};

// Stop a track
export type TrackEvent = {
  type: "track";
  trigger: "off";
  trackId: string;
  clipId?: undefined;
};

export type PlayerEvent = ClipEvent; //| TrackEvent;
