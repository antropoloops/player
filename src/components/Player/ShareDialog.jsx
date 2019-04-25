import React from "react";
import { useState } from "react";
import { requestSharedLinkToken } from "../../lib/channel";
import Dialog from "../shared/Dialog";
import { Link } from "react-router-dom";

const buildUrl = (token, audioset) => `/s/${token}`;

const SharedToken = ({ url }) => (
  <div>
    <p>Con éste enlace podrás conectarte desde otro dispositivo:</p>
    <Link to={url}>
      {window.location.origin}
      {url}
    </Link>
  </div>
);

const ShareMessage = ({ onShare }) => (
  <div>
    <p>
      Al compartir, crearemos un enlace para que otras personas, o tu con otro
      dispositivo, puedas jugar a la vez.
    </p>
    <button onClick={onShare}>Compartir</button>
  </div>
);

const ErrorMessage = () => (
  <p style={{ color: "red" }}>
    Lo sentimos, se ha producido un error al conectar con el servidor.
  </p>
);

const ShareDialog = ({ audioset, onClose }) => {
  const [url, setUrl] = useState(undefined);
  const [websocketError, setWebsocketError] = useState(undefined);

  const onShare = () => {
    requestSharedLinkToken(audioset)
      .then(token => {
        setUrl(buildUrl(token, audioset));
      })
      .catch(setWebsocketError);
  };
  return (
    <Dialog onClose={onClose}>
      <h1>Share session</h1>
      <div className="main">
        {websocketError ? (
          <ErrorMessage error={websocketError} />
        ) : url ? (
          <SharedToken url={url} />
        ) : (
          <ShareMessage onShare={onShare} />
        )}
      </div>
    </Dialog>
  );
};

export default ShareDialog;
