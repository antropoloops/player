import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  className: string;
  isActive?: boolean;
  isExternal?: boolean;
};
const NavLink: React.FC<Props> = ({
  className,
  isActive,
  isExternal,
  to,
  children,
}) => {
  return isActive ? (
    <label className={className}>{children}</label>
  ) : isExternal ? (
    <a
      className={className}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};

export default NavLink;
