import React from "react";
import Dialog from "../shared/Dialog";
import { Link } from "react-router-dom";

const InfoDialog = ({ audioset, onClose }) => (
  <Dialog onClose={onClose}>
    <h1>{audioset.meta.title}</h1>
    <section className="main">{audioset.meta.readme}</section>
    <section className="actions">
      <button onClick={onClose}>Entendido!</button>
      <Link to="/">O salir, y volver al inicio</Link>
    </section>
  </Dialog>
);

export default InfoDialog;
