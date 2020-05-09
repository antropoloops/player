import { Clip, Track } from "../../audioset";
import {
  ClipPlayingState,
  ClipPlayingStateByClipId,
  ControlState,
  TrackPlayingState,
  TrackPlayingStateByTrackId,
} from "./ControlState";

/**
 * It handles the state of the control
 */
export class ControlStateManager {
  private clipStateByClipId: ClipPlayingStateByClipId = {};
  private clipIdsOfTrack: Record<string, string[]> = {};
  private trackIdOfClip: Record<string, string> = {};
  private trackStateByTrackId: TrackPlayingStateByTrackId = {};

  public addClip(clip: Clip) {
    this.clipStateByClipId[clip.id] = { status: "stopped" };
    this.trackIdOfClip[clip.id] = clip.trackId;
  }
  public addTrack(track: Track) {
    const volume = track.volume || 1;
    this.trackStateByTrackId[track.id] = { status: "stopped", volume };
    this.clipIdsOfTrack[track.id] = track.clipIds;
  }
  public getAllClipIds() {
    return Object.keys(this.clipStateByClipId);
  }
  public getAllTrackIds() {
    return Object.keys(this.trackStateByTrackId);
  }
  public getClipState(clipId: string) {
    return this.clipStateByClipId[clipId];
  }
  public setClipState(clipId: string, newStsate: ClipPlayingState) {
    this.clipStateByClipId[clipId] = newStsate;
  }
  public getTrackState(trackId: string) {
    return this.trackStateByTrackId[trackId];
  }
  public setTrackState(trackId: string, state: TrackPlayingState) {
    this.trackStateByTrackId[trackId] = state;
  }
  public getTrackIdOfClip(clipId: string) {
    return this.trackIdOfClip[clipId];
  }
  public getClipIdsOfTrack(trackId: string) {
    return this.clipIdsOfTrack[trackId];
  }
  public getState(): ControlState {
    return {
      clips: { ...this.clipStateByClipId },
      tracks: { ...this.trackStateByTrackId },
    };
  }
}

export class PlayerControl extends ControlStateManager {}
