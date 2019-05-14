import React, { useReducer, useEffect } from "react";
import Visuals from "../shared/Visuals";
import Transport from "./Transport";
import useSync from "../hooks/useSync";
import InfoDialog from "./InfoDialog";
import { initAudio } from "../../lib/audio";
import { stopAll } from "../../lib/sync";
import ShareDialog from "./ShareDialog";
import * as screen from "screenfull";

const initialState = {
  modal: "info",
  stopAt: null,
  fullscreenAt: null
};

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "info":
    case "share":
      return { ...state, modal: state.modal === type ? null : type };
    case "stop":
      return { ...state, stopAt: Date.now() };
    case "fullscreen":
      return { ...state, fullscreenAt: Date.now() };
    default:
      return state;
  }
}

const Player = ({ audioset }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sync = useSync(audioset);

  useEffect(() => {
    sync.dispatch(stopAll());
  }, [sync, state.stopAt]);

  useEffect(() => {
    if (state.fullscreenAt && screen.enabled) screen.request();
  }, [state.fullscreenAt]);

  const Dialog = getDialog(state.modal);

  const handleClose = () =>
    initAudio().then(() => dispatch({ type: state.modal }));

  return (
    <>
      {Dialog && <Dialog audioset={audioset} onClose={handleClose} />}
      <Visuals sync={sync} audioset={audioset} />
      <Transport onClick={event => dispatch({ type: event })} />
    </>
  );
};

export default Player;

function getDialog(modal) {
  switch (modal) {
    case "info":
      return InfoDialog;
    case "share":
      return ShareDialog;
    default:
      return null;
  }
}
