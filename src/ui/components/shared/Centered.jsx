/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Centered = ({ style, children }) => (
  <div className="Centered" style={style} css={centerStyles}>
    <div className="content">{children}</div>
  </div>
);

const centerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .content {
    background-color: black;
    padding: 1em;
  }
`;

export default Centered;
