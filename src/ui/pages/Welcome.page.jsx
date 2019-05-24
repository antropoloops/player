import React, { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import Loading from "../components/shared/Loading";

const url = `https://antropoloops-production.s3.eu-west-3.amazonaws.com/files/index.audioset.json`;

export default () => {
  const [index, setIndex] = useState();

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setIndex);
  }, []);

  return index ? <Welcome index={index} /> : <Loading />;
};
