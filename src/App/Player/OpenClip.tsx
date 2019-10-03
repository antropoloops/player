/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Markdown } from "../shared/Markdown";

export const OpenClip = ({ ref, clip, onClick }: any) => {
  return (
    <div ref={ref} css={clipCss} className="Clip" onClick={onClick}>
      <div>
        <img css={coverCss} alt={clip.title} src={clip.coverUrl} />
        <img css={coverCss} alt={clip.title} src={clip.coverUrl} />
      </div>
      <div className="meta">
        <h3 className="title">{clip.title}</h3>
        <p>{clip.artist}</p>
        <Markdown markdown={clip.readme} />
      </div>
    </div>
  );
};

const clipCss = css`
  display: flex;
  flex-direction: column;
`;

const coverCss = css`
  width: 50%;
`;
