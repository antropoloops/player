import React from "react";
import { motion } from "framer-motion";

type Props = {
  isOpen: boolean;
};
const variants = {
  open: { height: "auto" },
  collapsed: { height: 0 },
};

const Collapsable: React.FC<Props> = ({ isOpen, children }) => (
  <motion.div
    className="overflow-hidden"
    initial={isOpen ? "open" : "collapsed"}
    animate={isOpen ? "open" : "collapsed"}
    variants={variants}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default Collapsable;
