import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Section } from "../../api/sections";
import useLocale from "../../hooks/useLocale";

type Props = {
  open: boolean;
  sections: Section[];
};

const VARIANTS = {
  collapsed: { height: "0" },
  open: { height: "auto" },
};

const STYLES = {
  link:
    "py-1 px-2 border-b border-gray-medium hover:bg-gray-light hover:text-green",
};

const Navigation: React.FC<Props> = ({ open, sections }) => {
  const { formatMessage: f } = useLocale();

  return (
    <motion.div
      className="overflow-hidden"
      initial={open ? "open" : "collapsed"}
      animate={open ? "open" : "collapsed"}
      variants={VARIANTS}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col text-white border-t border-gray-medium">
        {sections.map((section) =>
          section.path ? (
            <Link key={section.id} className={STYLES.link} to={section.path}>
              {f(section.id.toUpperCase())}
            </Link>
          ) : (
            <a
              href={section.url}
              key={section.id}
              target="_blank"
              rel="noopener noreferrer"
              className={STYLES.link}
            >
              {f(section.id.toUpperCase())}
            </a>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
