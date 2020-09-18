import React from "react";
import cc from "classcat";

type Props = {
  className?: string;
  onClick?: () => void;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const IconButton: React.FC<Props> = ({
  className,
  children,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className={cc([
        className,
        "flex items-center pr-3 leading-6",
        "text-sm text-white-dark bg-gray-medium rounded-full",
        "hover:text-white hover:bg-gray-light",
        "focus:outline-none",
      ])}
      onClick={onClick}
    >
      {Icon && <Icon className="w-6 h-6 rounded-full p-1 mr-1 shadow" />}
      {children}
    </button>
  );
};
export default IconButton;
