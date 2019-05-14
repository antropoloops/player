import React from "react";
import Dialog from "../shared/Dialog";
import { Link } from "react-router-dom";

const InfoDialog = ({ audioset, onClose }) => (
  <Dialog onClose={onClose}>
    {!audioset.meta.readme && <h1>{audioset.meta.title}</h1>}
    <section className="main markdown">
      <div dangerouslySetInnerHTML={{ __html: audioset.meta.readme }} />
    </section>
    <section className="actions">
      <button onClick={onClose}>Ok!</button>
      <Link to="/">Or, close this set</Link>
    </section>
  </Dialog>
);

export default InfoDialog;
