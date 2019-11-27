import { getAudioContext } from "./AudioContext";
import { AudioContextEngine } from "./AudioContextEngine";
import { fetchAudioset } from "./fetchAudioset";
import { Player, PlayerState } from "./Player";

export { getAudioContext } from "./AudioContext";

/**
 * Singleton instance
 */
export const player: Player = new PlayerState();
player.loader.fetch = fetchAudioset;

getAudioContext().then(context => {
  player.setAudioEngine(new AudioContextEngine(context));
});
