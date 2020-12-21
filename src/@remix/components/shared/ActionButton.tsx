import React from "react";
import cc from "classcat";
import { AddIcon } from "../../../components/icons/Icons";
import Spinner from "./Spinner";

export type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

type Props = {
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  colors?: string;
  bgColor?: string;
  icon?: SvgIcon;
  smallIcon?: boolean;
  margins?: string;
  style?: React.CSSProperties;
  working?: boolean;
};

export const ActionButton: React.FC<Props> = (props) => {
  return (
    <button {...getActionProps(props)} onClick={props.onClick}>
      <ActionIcon {...props} />
      {props.children}
    </button>
  );
};

export default ActionButton;

export const ActionIcon = (props: Props) => {
  const Icon = props.icon || AddIcon;
  return props.working ? (
    <Spinner />
  ) : (
    <Icon
      className={cc([
        "fill-current",
        props.smallIcon ? "w-4 ml-1 mr-2" : "w-6 mr-2",
      ])}
    />
  );
};

export function getActionProps({
  className,
  margins = "mr-4",
  disabled,
  working,
  colors = "text-black bg-gray-lighter",
  bgColor,
  style,
}: Props) {
  return {
    disabled: working || disabled,
    className: cc([
      "flex items-center p-1 pr-4 text-ag-dark rounded-full",
      "whitespace-no-wrap focus:outline-none",
      margins,
      colors,
      disabled
        ? "opacity-25 cursor-not-allowed"
        : "opacity-75 hover:opacity-100",
      className,
    ]),
    style: bgColor ? { backgroundColor: bgColor } : style,
  };
}
