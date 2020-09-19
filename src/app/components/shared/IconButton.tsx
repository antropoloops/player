import React from "react";
import cc from "classcat";

type Props = {
  className?: string;
  onClick?: () => void;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  color?: string;
};

const IconButton: React.FC<Props> = ({
  className,
  children,
  icon: Icon,
  onClick,
  color = "white-dark",
}) => {
  return (
    <button
      className={cc([
        className,
        "flex items-center pr-3 leading-6",
        "text-" + color,
        "text-sm bg-gray-medium rounded-full",
        "hover:text-white hover:bg-gray-light",
        "focus:outline-none",
      ])}
      onClick={onClick}
    >
      {Icon && (
        <Icon className="w-6 h-6 rounded-full p-1 mr-1 shadow fill-current" />
      )}
      {children}
    </button>
  );
};
export default IconButton;
