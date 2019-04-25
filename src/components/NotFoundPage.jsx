import React from "react";
import { Link } from "react-router-dom";
import Centered from "./shared/Centered";

function NotFound() {
  return (
    <Centered>
      <h3>Page not found</h3>
      <p>Sorry, we didn't find what you're looking for</p>
      <a href="https://antropoloops.tumblr.com/post/166883844048/links">
        <img
          width="500"
          height="500"
          src="https://66.media.tumblr.com/dbe92884e2815033868d3384fea3053a/tumblr_oyjmykm6Y01sdkrqjo1_500.gif"
          alt="Fuentes musicales"
        />
      </a>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </Centered>
  );
}

export default NotFound;
