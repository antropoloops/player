import React from "react";
import { Link } from "react-router-dom";
import { EditIcon } from "../../../components/icons/Icons";

type Props = {
  to?: string;
  onClick?: () => void;
};

const STYLE =
  "w-5 h-5 text-white p-1 ml-2 bg-gray-light opacity-50 rounded-full hover:opacity-100 hover:shadow";

const EditLink: React.FC<Props> = ({ to, onClick }) => {
  if (to) {
    return (
      <Link className={STYLE} to={to}>
        <EditIcon className="fill-current w-3 h-3" />
      </Link>
    );
  } else {
    return (
      <button className={STYLE} onClick={onClick}>
        <EditIcon className="fill-current w-3 h-3" />
      </button>
    );
  }
};
export default EditLink;
