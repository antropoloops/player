import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../Icons";
import routes from "../../routes";
import { Section } from "../../@core/helpers/sectionHelpers";
import Navigation from "./Navigation";

type Props = {
  logo?: boolean;
  title?: string;
  backTo?: string;
  sections: Section[];
};

const HeaderMobile: React.FC<Props> = ({ logo, title, backTo, sections }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);
  return (
    <div className="">
      <div className="p-2 flex items-center text-gray-light">
        {logo ? (
          <button
            className="flex-grow mr-4 focus:outline-none"
            onClick={toggleOpen}
          >
            <img
              className="h-6"
              src="/images/play-logo-gray.png"
              alt="Play antropoloops"
            />
          </button>
        ) : (
          <>
            <Link
              className="flex mr-2 hover:text-white-light duration-300 transition-medium"
              to={backTo || routes.root()}
            >
              <ArrowLeft />
            </Link>
            <span className="flex-grow text-white">
              {title || "Antropoloops"}
            </span>
          </>
        )}
        <button
          className="hover:text-white focus:outline-none"
          onClick={toggleOpen}
        >
          <svg
            className={`fill-current h-4 w-4
            transform duration-300 ${
              open
                ? "-rotate-90 ease-out transition-medium text-green"
                : "rotate-0 ease-in transition-medium text-white"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Navigation</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <Navigation open={open} sections={sections} />
    </div>
  );
};
export default HeaderMobile;
