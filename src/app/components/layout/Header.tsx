import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "../Icons";
import routes from "../../routes";

export type HeaderProps = {
  logo?: boolean;
  title?: string;
  backTo?: string;
};

const NAVIGATION = [
  { label: "Inicio", path: routes.root() },
  { label: "Proyectos", path: routes.projects() },
  { label: "Temas", path: routes.topics() },
];

const variants = {
  collapsed: { height: "0" },
  open: { height: "auto" },
};

const Header: React.FC<HeaderProps> = ({ logo, title, backTo }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="p-2 flex items-center text-gray-light">
        {logo ? (
          <Link className="flex-grow mr-4" to={backTo || routes.root()}>
            <img className="h-6" src="/play-logo.png" alt="Play antropoloops" />
          </Link>
        ) : (
          <Link
            className="flex flex-grow mr-2 hover:text-green transition-medium"
            to={backTo || routes.root()}
          >
            <ArrowLeft />
            <span className="ml-2 text-white">{title || "Antropoloops"}</span>
          </Link>
        )}
        <button
          className="hover:text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className={`fill-current h-4 w-4
            transform duration-300 ${
              open
                ? "-rotate-90 ease-out transition-medium"
                : "rotate-0 ease-in transition-medium"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Navigation</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={open ? "open" : "collapsed"}
        animate={open ? "open" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col text-white border-t border-gray-medium">
          {NAVIGATION.map((nav) => (
            <Link
              key={nav.label}
              className="py-1 px-2 hover:bg-gray-light border-b border-gray-medium"
              to={nav.path}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default Header;
