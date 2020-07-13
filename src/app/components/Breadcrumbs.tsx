import React, { ReactNode } from "react";
import NavLink from "./layout/NavLink";

export type Breadcrum = {
  label?: string;
  to?: string;
};

type Props = {
  items: Breadcrum[];
};
const Breadcrums: React.FC<Props> = ({ items }) => {
  const links = items
    .filter((item) => item.label)
    .map((item) => (
      <NavLink key={item.label} isActive={!item.to} to={item.to || "/"}>
        {item.label}
      </NavLink>
    ));

  const linksWithSeparator = links.reduce((all, link, i) => {
    all.push(link);
    if (links[i + 1]) all.push(<span className="px-2">/</span>);
    return all;
  }, [] as ReactNode[]);

  return <div className="flex">{linksWithSeparator}</div>;
};
export default Breadcrums;
