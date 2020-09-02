import React from "react";

type Props = {
  content: string;
  className?: string;
};

export const HtmlContent: React.FC<Props> = ({ content, className = "" }) =>
  content && content.length ? (
    <div
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <div />
  );

export default HtmlContent;
