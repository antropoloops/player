import React from "react";

type Props = {
  className?: string;
  level: 1 | 2 | 3 | 4;
  style?: React.CSSProperties;
};

export const Title: React.FC<Props> = ({
  className = "",
  level,
  children,
  style,
}) => {
  switch (level) {
    case 1:
      return (
        <h1 className={"text-4xl " + className} style={style}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={"text-2xl " + className} style={style}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={"text-xl " + className} style={style}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={"text-lg " + className} style={style}>
          {children}
        </h4>
      );
  }
};

export const Heading = Title;
