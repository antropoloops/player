import React, { useReducer, useEffect } from "react";
import "./Clip.css";

const SPECIAL = {
  ARROWLEFT: "←",
  ARROWRIGHT: "→",
  ARROWUP: "↑",
  ARROWDOWN: "↓",
  SHIFT: "↗"
};

function printKey(key) {
  if (!key) return;
  return SPECIAL[key] || key;
}

function reducer(state, action) {
  switch (action.type) {
    case "setKey":
      return { ...state, isEdit: false, key: action.key };
    case "toggle":
      return { ...state, isEdit: !state.isEdit };
    default:
      return state;
  }
}

const ClipSummary = ({ clip, onClick, keyboard }) => {
  const [state, dispatch] = useReducer(reducer, {
    key: keyboard.getKey(clip.id)
  });
  useEffect(() => {
    if (state.isEdit) {
      keyboard.setActive(false);
      const onKeyDown = e => {
        keyboard.setKey(clip.id, e.key);
        keyboard.setActive(true);
        dispatch({ type: "setKey", key: e.key });
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [clip.id, state.isEdit, keyboard]);

  return (
    <div className="Clip summary">
      <button className="cover" onClick={() => onClick(clip)}>
        <img src={clip.coverUrl} alt={clip.id} />
      </button>
      <div className="info">
        <p>{clip.title}</p>
        <p>{clip.author}</p>
        <p>{clip.year}</p>
      </div>
      <div className="actions">
        <button
          className="keyMap"
          style={{
            color: clip.color,
            backgroundColor: state.isEdit ? "white" : "black"
          }}
          onClick={() => dispatch({ type: "toggle" })}
        >
          {state.isEdit ? "?" : printKey(keyboard.getKey(clip.id))}
        </button>
      </div>
    </div>
  );
};

const ClipInfo = ({ clip, onClick }) => (
  <div className="Clip info">
    <button className="cover" onClick={() => onClick(clip)}>
      <img src={clip.coverUrl} alt={clip.id} />
    </button>
  </div>
);

export default props =>
  props.active ? <ClipInfo {...props} /> : <ClipSummary {...props} />;
