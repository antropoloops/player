import React from "react";
import cc from "classcat";
import { AddIcon } from "../../../components/icons/Icons";
import Spinner from "./Spinner";

type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

type Props = {
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  colors?: string;
  icon?: SvgIcon;
  smallIcon?: boolean;
  margins?: string;
  style?: React.CSSProperties;
  working?: boolean;
};

export const ActionButton: React.FC<Props> = ({
  type = "button",
  className,
  onClick,
  margins = "mr-4",
  disabled,
  colors = "text-black bg-gray-lighter",
  icon: Icon = AddIcon,
  smallIcon,
  children,
  working,
  style,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cc([
        "flex items-center p-1 pr-4 text-ag-dark rounded-full",
        "whitespace-no-wrap focus:outline-none",
        margins,
        colors,
        disabled
          ? "opacity-25 cursor-not-allowed"
          : "opacity-75 hover:opacity-100",
        className,
      ])}
      onClick={onClick}
      style={style}
    >
      {working ? (
        <Spinner />
      ) : (
        <Icon
          className={cc([
            "fill-current",
            smallIcon ? "w-4 ml-1 mr-2" : "w-6 mr-2",
          ])}
        />
      )}
      {children}
    </button>
  );
};

export default ActionButton;
