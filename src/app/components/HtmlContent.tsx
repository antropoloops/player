import React from "react";

type Props = {
  content: string;
  className?: string;
};

export const HtmlContent: React.FC<Props> = ({ content, className = "" }) =>
  content && content.length ? (
    <div
      className={`HtmlContent ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <div />
  );

export default HtmlContent;
