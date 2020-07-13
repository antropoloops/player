import React from "react";

type Props = {
  markdown: string;
  className?: string;
};

export const HtmlContent: React.FC<Props> = ({ markdown, className = "" }) =>
  markdown && markdown.length ? (
    <div
      className={`HtmlContent ${className}`}
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  ) : (
    <div />
  );

export default HtmlContent;
