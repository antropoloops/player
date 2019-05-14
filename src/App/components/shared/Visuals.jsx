/** @jsx jsx */
import { useEffect, useRef } from "react";
import { css, jsx } from "@emotion/core";
import createVisuals from "../../../lib/visuals";

const Visuals = ({ audioset, sync }) => {
  const visualsRef = useRef();
  useEffect(() => {
    if (audioset && visualsRef.current) {
      sync.addEffect(() => {
        return createVisuals(audioset, visualsRef.current);
      });
    }
  }, [audioset, sync]);
  return <div className="Visuals" css={visualsStyles} ref={visualsRef} />;
};

const visualsStyles = css`
  width: 100%;
  height: 100vh;
  background-color: #2c2c2c;
`;

export default Visuals;
