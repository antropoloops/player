import React from "react";
import Layout from "./Layout";
import "./NotFound.css";

function NotFound() {
  return (
    <Layout className="NotFound">
      <Layout.Sidebar>
        <a href="/">
          <h3>Oooops...</h3>
        </a>
      </Layout.Sidebar>
      <Layout.Main>
        <a href="https://antropoloops.tumblr.com/post/166883844048/links">
          <img
            width="500"
            height="500"
            src="https://66.media.tumblr.com/dbe92884e2815033868d3384fea3053a/tumblr_oyjmykm6Y01sdkrqjo1_500.gif"
            alt="Fuentes musicales"
          />
        </a>
        <p />
      </Layout.Main>
    </Layout>
  );
}

export default NotFound;
