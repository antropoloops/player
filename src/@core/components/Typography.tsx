import React from "react";

type Props = {
  className?: string;
  level: 1 | 2 | 3 | 4;
};

export const Title: React.FC<Props> = ({ className = "", level, children }) => {
  switch (level) {
    case 1:
      return <h1 className={"text-4xl " + className}>{children}</h1>;
    case 2:
      return <h2 className={"text-2xl " + className}>{children}</h2>;
    case 3:
      return <h3 className={"text-xl " + className}>{children}</h3>;
    case 4:
      return <h4 className={"text-lg " + className}>{children}</h4>;
  }
};

export const Heading = Title;
