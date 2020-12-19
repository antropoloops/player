import React from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "./icons/Icons";

type Props = {
  to: string;
  label?: string;
};

const BackToLink: React.FC<Props> = ({ to, label, children }) => {
  return (
    <Link
      className="py-2 flex items-center text-white hover:text-white-light"
      to={to}
    >
      <ArrowBackIcon className="w-4 h-4 mr-1 fill-current" />
      <div className="">{label || children}</div>
    </Link>
  );
};
export default BackToLink;
