import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../Icons";
import routes from "../../routes";

type Props = {
  title?: string;
  backTo?: string;
};

const Header: React.FC<Props> = ({ title, backTo }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-2">
      <div className="flex items-center text-gray-light">
        <Link
          className="mr-2 hover:text-white transition-medium"
          to={backTo || routes.root()}
        >
          <ArrowLeft />
        </Link>
        <span className="flex-grow text-white">{title || "Antropoloops"}</span>
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

      {open && (
        <div className="flex flex-col text-white mt-4">
          <Link to={routes.root()}>Home</Link>
          <Link to={routes.projects()}>Proyectos</Link>
          <Link to={routes.topics()}>Temas</Link>
        </div>
      )}
    </div>
  );
};
export default Header;
