import React from "react";
import "./Markdown.css";

interface MarkdownProps {
  markdown: string;
  className?: string;
}

export const Markdown = ({ markdown, className = "" }: MarkdownProps) =>
  markdown && markdown.length ? (
    <div
      className={`Markdown ${className}`}
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  ) : (
    <div />
  );
