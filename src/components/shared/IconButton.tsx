import React from "react";
import cc from "classcat";

type Props = {
  className?: string;
  onClick?: () => void;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  color?: string;
  textColor?: string;
};

const IconButton: React.FC<Props> = ({
  className,
  children,
  icon: Icon,
  onClick,
  color,
  textColor,
}) => {
  return (
    <button
      className={cc([
        className,
        "flex items-center pr-3 leading-6",
        textColor || color || "text-white-dark",
        "text-sm bg-gray-light rounded-full",
        "opacity-75 hover:opacity-100",
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
