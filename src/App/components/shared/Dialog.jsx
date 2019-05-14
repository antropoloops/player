/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Modal from "./Modal";

const Dialog = ({ children, onClose }) => (
  <Modal onRequestClose={onClose}>
    <div css={dialogStyles}>{children}</div>
  </Modal>
);

const dialogStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;

  h1 {
    margin-bottom: 1rem;
  }
  .main {
    flex-grow: 1;
    overflow-y: scroll;
  }
  .actions {
    margin-top: 2rem;
    padding-top: 0.5rem;
    border-top: 0.5px solid white;
  }
  .actions > * {
    margin-right: 1rem;
  }
`;

export default Dialog;
