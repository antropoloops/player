import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";

type SeparatorProps = {
  className?: string;
  onClick?: () => void;
  to?: string;
};

export const Separator: React.FC<SeparatorProps> = ({
  className = "bg-pink-600",
  onClick,
  children,
  to,
}) => {
  return (
    <div
      className={classcat([
        "p-1 mb-1 w-full flex",
        "text-gray-black text-left select-none",
        className,
      ])}
      role="separator"
      onClick={onClick}
    >
      {to ? <Link to={to}>{children}</Link> : children}
    </div>
  );
};
