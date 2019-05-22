import React, { useState, useEffect } from "react";
import Explorer from "../components/Explorer";
import { fetchAudioset } from "../../lib/audioset";
import Loading from "../components/shared/Loading";

const urlFromId = audiosetId =>
  `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/${audiosetId}.json`;

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

  return audioset ? <Explorer audioset={audioset} /> : <Loading />;
};

export default ExplorePage;

function useAudioset(url) {
  const [audioset, setAudioset] = useState();

  useEffect(() => {
    fetchAudioset(url).then(setAudioset);
  }, [url]);

  return audioset;
}
