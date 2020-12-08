import React from "react";
import { AddIcon } from "../../../components/icons/Icons";

type Props = {
  onClick: () => void;
  color?: string;
};

const AddItemButton: React.FC<Props> = ({
  onClick,
  color = "text-pink-600",
  children,
}) => {
  return (
    <button
      className="m-1 py-2 pl-2 pr-4 rounded-full flex items-center hover:bg-gray-light text-white opacity-75 hover:opacity-100 hover:shadow"
      onClick={onClick}
    >
      <AddIcon className={"mr-2 w-8 h-8 fill-current " + color} />
      {children}
    </button>
  );
};

export default AddItemButton;
