import React, { useReducer } from "react";
import { ArrowDown, ArrowUp } from "../Icons";
import { Markdown } from "../Markdown";
import { motion } from "framer-motion";
import "./Readme.css";

interface ReadmeProps {
  className?: string;
  content: string;
}
const variants = {
  open: { height: "auto" },
  collapsed: { height: "6rem" },
};

export const Readme = ({ className, content }: ReadmeProps) => {
  const [isOpen, toggleOpen] = useReducer((x) => !x, false);

  if (!content.length) {
    return null;
  }

  const summary = getSummary(content);
  const isLarge = content.length > summary.length;

  return (
    <div className={`${className}`}>
      <motion.div
        className="overflow-hidden"
        initial={isOpen ? "open" : "collapsed"}
        animate={isOpen ? "open" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <Markdown markdown={content} />
      </motion.div>
      <div className="flex justify-center p-2">
        <button
          className="rounded-full shadow focus:outline-none"
          onClick={toggleOpen}
        >
          {isLarge &&
            (isOpen ? (
              <ArrowUp className="text-gray-light" />
            ) : (
              <ArrowDown className="text-gray-light" />
            ))}
        </button>
      </div>
    </div>
  );
};

function getSummary(content: string) {
  const nextLineIndex = content.indexOf("\n");
  const firstLine =
    nextLineIndex > 0 ? content.slice(0, nextLineIndex) : content;
  if (firstLine.length < 100) {
    return firstLine;
  }

  const firstPointIndex = firstLine.search(/[.:]/);
  const firstSentence =
    firstPointIndex > 0 ? firstLine.slice(0, firstPointIndex) : firstLine;
  return firstSentence + ".";
}
