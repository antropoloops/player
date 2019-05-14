import React, { useState, useEffect } from "react";
import Centered from "../shared/Centered";
import Explorer from "../components/Explorer";
import { fetchAudioset } from "../../lib/audioset";

const urlFromId = audiosetId => `/audiosets/${audiosetId}.audioset.json`;

function getUrlFromQueryParam() {
  const params = new URL(document.location).searchParams;
  return params.get("url");
}

/**
 * Explore Page
 * Convert from routes (match object) to the actual component
 */
const ExplorePage = ({ match }) => {
  const audiosetId = match.params.id;
  const url = audiosetId ? urlFromId(audiosetId) : getUrlFromQueryParam();

  const audioset = useAudioset(url);

  return audioset ? (
    <Explorer audioset={audioset} />
  ) : (
    <Centered>{url ? "Loading..." : "No audioset"}</Centered>
  );
};

export default ExplorePage;

function useAudioset(url) {
  const [audioset, setAudioset] = useState();

  useEffect(() => {
    fetchAudioset(url).then(setAudioset);
  }, [url]);

  return audioset;
}
