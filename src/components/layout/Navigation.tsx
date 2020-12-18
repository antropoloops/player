import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Section } from "../../@core/helpers/sectionHelpers";
import useLocale from "../../hooks/useLocale";
import NavLink from "./NavLink";

type Props = {
  open: boolean;
  sections: Section[];
};

const VARIANTS = {
  collapsed: { height: "0" },
  open: { height: "auto" },
};

const Navigation: React.FC<Props> = ({ open, sections }) => {
  const { formatMessage: f } = useLocale();
  const { pathname } = useLocation();

  return (
    <motion.div
      className="overflow-hidden"
      initial={open ? "open" : "collapsed"}
      animate={open ? "open" : "collapsed"}
      variants={VARIANTS}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col text-white border-t border-gray-medium">
        {sections.map((section) => (
          <NavLink
            key={section.id}
            to={section.to}
            isActive={section.to === pathname}
            isExternal={section.external}
            className="p-2 border-b border-gray-medium"
          >
            {f(section.id)}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default Navigation;
