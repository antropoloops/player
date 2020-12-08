import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";
import { AddIcon } from "../icons/Icons";

type Props = {
  to: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  color?: string;
};

const IconLink: React.FC<Props> = ({
  to,
  children,
  color,
  icon: Icon = AddIcon,
}) => {
  return (
    <Link
      className={classcat([
        "flex items-center opacity-50 hover:opacity-100",
        color,
      ])}
      to={to}
    >
      <Icon className="mr-1 h-5 w-5" />
      {children}
    </Link>
  );
};
export default IconLink;
