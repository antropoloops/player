/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const ClosedClip = ({ ref, clip, onClick }: any) => {
  return (
    <div className="Clip" css={clipCss} onClick={onClick}>
      <img css={coverCss} alt={clip.title} src={clip.coverUrl} />
      <div className="meta">
        <h3 className="title">{clip.title}</h3>
      </div>
      <div className="keyboard">
        <span>{clip.keyMap}</span>
      </div>
    </div>
  );
};

const clipCss = css`
  display: flex;
  flex-direction: "row";
`;

const coverCss = css`
  width: 50px;
`;
