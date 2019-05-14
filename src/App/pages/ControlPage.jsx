import React, { useState, useEffect } from "react";
import Centered from "../shared/Centered";
import Player from "../Player";
import { requestJoinSession } from "../../lib/channel";
import { migrateAudioset } from "../../lib/audioset";

/**
 * Player Page
 * Convert from routes (match object) to the actual component
 */
const ControlPage = ({ match }) => {
  const token = match.params.id;
  const audioset = useSharedAudioset(token);

  return audioset ? (
    <Player audioset={audioset} />
  ) : (
    <Centered>Connecting with {token}...</Centered>
  );
};

export default ControlPage;

function useSharedAudioset(token) {
  const [audioset, setAudioset] = useState();

  useEffect(() => {
    requestJoinSession(token).then(audioset =>
      setAudioset(migrateAudioset(audioset))
    );
  }, [token]);

  return audioset;
}
