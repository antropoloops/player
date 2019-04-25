/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fullscreen, Stop, Controls, Sound, Info, AddUser } from "./Icons";

const Transport = ({ onClick }) => {
  return (
    <div css={transportStyle}>
      <button onClick={() => onClick("info")}>{Info}</button>
      {/* <button onClick={() => onClick("share")}>{AddUser}</button> */}
      {/* <button onClick={() => onClick("controls")}>{Controls}</button> */}
      <button onClick={() => onClick("fullscreen")}>{Fullscreen}</button>
      {/* <button onClick={() => onClick("sound")}>{Sound}</button> */}
      <button onClick={() => onClick("stop")}>{Stop}</button>
    </div>
  );
};

const transportStyle = css`
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;

export default Transport;
