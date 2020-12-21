import React from "react";
import { Link } from "react-router-dom";
import { ActionIcon, getActionProps, SvgIcon } from "./ActionButton";

type Props = {
  className?: string;
  to: string;
  colors?: string;
  bgColor?: string;
  icon?: SvgIcon;
  smallIcon?: boolean;
  margins?: string;
  working?: boolean;
};

const ActionLink: React.FC<Props> = (props) => {
  const { className } = getActionProps(props);
  return (
    <Link to={props.to} className={className}>
      <ActionIcon {...props} />
      {props.children}
    </Link>
  );
};

export default ActionLink;
