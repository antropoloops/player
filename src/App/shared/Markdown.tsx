import React from "react";
import "./Markdown.css";

interface MarkdownProps {
  markdown: string;
  className?: string;
}

export const Markdown = ({ markdown, className }: MarkdownProps) =>
  markdown ? (
    <div
      className={`${className} Markdown`}
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  ) : (
    <div />
  );
