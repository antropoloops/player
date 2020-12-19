import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "./Icons";

type Props = {
  to: string;
  label: string;
};

const BackToHeaderLink: React.FC<Props> = ({ to, label }) => {
  return (
    <Link className="p-2 flex items-center bg-gray-medium group" to={to}>
      <ArrowLeft className="mr-1 h-5 w-5 text-white-dark group-hover:text-white" />
      <div className="text-white group-hover:text-white-light">{label}</div>
    </Link>
  );
};
export default BackToHeaderLink;
