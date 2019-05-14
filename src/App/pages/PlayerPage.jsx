import React, { useState, useEffect } from "react";
import Centered from "../shared/Centered";
import Player from "../components/Player";
import { fetchAudioset } from "../../lib/audioset";

/**
 * Player Page
 * Convert from routes (match object) to the actual component
 */
const PlayerPage = ({ match }) => {
  const audiosetId = match.params.id;
  const audioset = useAudioset(audiosetId);

  return audioset ? (
    <Player audioset={audioset} />
  ) : (
    <Centered>Loading {audiosetId}</Centered>
  );
};

export default PlayerPage;

function useAudioset(audiosetId) {
  const [audioset, setAudioset] = useState();

  useEffect(() => {
    const url = `/audiosets/${audiosetId}.audioset.json`;
    fetchAudioset(url).then(setAudioset);
  }, [audiosetId]);

  return audioset;
}
