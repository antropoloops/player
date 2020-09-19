import React from "react";

type Props = {
  content: string;
  className?: string;
  force?: boolean;
};

export const HtmlContent: React.FC<Props> = ({
  force,
  content,
  className = "",
}) =>
  force || (content && content.length) ? (
    <div
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <div />
  );

export default HtmlContent;
