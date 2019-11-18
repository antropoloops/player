import { getAudioContext } from "./AudioContext";
import { AudioContextEngine } from "./AudioContextEngine";
import { fetchAudioset } from "./fetchAudioset";
import { Player } from "./Player";

export { getAudioContext } from "./AudioContext";

/**
 * Singleton instance
 */
export const player = new Player();
player.loader.fetch = fetchAudioset;

getAudioContext().then(context => {
  player.setAudioEngine(new AudioContextEngine(context));
});
