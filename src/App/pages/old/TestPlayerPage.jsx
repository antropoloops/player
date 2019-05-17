import React, { useState, useEffect } from "react";
import Centered from "../shared/Centered";
import Player from "../Player";
import { fetchAudioset } from "../../../lib/audioset";

/**
 * Player Page
 * Convert from routes (match object) to the actual component
 */
const PlayerPage = () => {
  let params = new URL(document.location).searchParams;
  let url = params.get("url");

  const audioset = useAudioset(url);

  return !url ? (
    <Centered>
      Usage:
      /test?url=https://atpls-share.herokuapp.com/audiosets/continentes.json
    </Centered>
  ) : audioset ? (
    <Player audioset={audioset} />
  ) : (
    <Centered>Loading {url}</Centered>
  );
};

export default PlayerPage;

function useAudioset(url) {
  const [audioset, setAudioset] = useState();

  useEffect(() => {
    fetchAudioset(url).then(setAudioset);
  }, [url]);

  return audioset;
}
