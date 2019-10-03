import { getAudioContext } from "./AudioContext";
import { AudioContextEngine } from "./AudioContextEngine";
import { fetchAudioBuffer } from "./fetchAudioBuffer";
import { fetchAudioset } from "./fetchAudioset";
import { Player } from "./Player";

/**
 * Singleton instance
 */
export const player = new Player();
player.loader.fetch = fetchAudioset;
player.setFetchAudio(fetchAudioBuffer);

getAudioContext().then(context => {
  player.setAudioEngine(new AudioContextEngine(context));
});
