import React from "react";
import cc from "classcat";
import { AddIcon } from "../../../components/icons/Icons";

type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

type Props = {
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  colors?: string;
  icon?: SvgIcon;
  smallIcon?: boolean;
  style?: React.CSSProperties;
};

export const ActionButton: React.FC<Props> = ({
  type = "button",
  className,
  onClick,
  disabled,
  colors,
  icon: Icon = AddIcon,
  smallIcon,
  children,
  style,
}) => {
  return (
    <button
      type={type}
      className={cc([
        "flex items-center p-1 pr-4 text-ag-dark rounded-full",
        "opacity-75 hover:opacity-100 focus:outline-none",
        colors || "text-black bg-gray-lighter",
        disabled && "opacity-20",
        className,
      ])}
      onClick={onClick}
      style={style}
    >
      <Icon
        className={cc([
          "fill-current",
          smallIcon ? "w-4 ml-1 mr-2" : "w-6 mr-2",
        ])}
      />
      {children}
    </button>
  );
};

export default ActionButton;
