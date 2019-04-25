import React from "react";
import { Link } from "react-router-dom";
import Modal from "./shared/Modal";

const About = () => {
  return (
    <Modal>
      <h2>About</h2>
      <p>
        Antropoloops player allow to play Antropoloops sets within the browser.
      </p>
      <p>
        <a
          href="https://makeymakey.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MakeyMakey compatible
        </a>
      </p>
      <Link to="/">Go back</Link>
    </Modal>
  );
};
export default About;
