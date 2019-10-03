import React from "react";

interface MarkdownProps {
  markdown: string;
}

export const Markdown = ({ markdown }: MarkdownProps) =>
  markdown ? <div dangerouslySetInnerHTML={{ __html: markdown }} /> : <div />;
