import React from "react";

type Props = {
  level: 1 | 2 | 3 | 4;
};

export const Heading: React.FC<Props> = ({ level, children }) => {
  switch (level) {
    case 1:
      return <h1 className="text-4xl mb-4">{children}</h1>;
    case 2:
      return <h2 className="text-2xl mb-4">{children}</h2>;
    default:
      return <div>{children}</div>;
  }
};
