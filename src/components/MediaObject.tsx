import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  to: string;
  image?: string;
  imageSize?: string;
  alt: string;
  ratio?: "1:1" | "16:9";
  margin?: string;
  style?: React.CSSProperties;
};
const MediaObject: React.FC<Props> = ({
  className = "",
  to,
  alt,
  image,
  margin = "mt-1",
  imageSize = "w-1/3",
  children,
  ratio,
  style,
}) => {
  const viewBox = ratio === "1:1" ? "0 0 1 1" : "0 0 16 9";
  return (
    <Link
      to={to}
      className={classcat([
        "flex w-full text-white min-h-12 overflow-hidden shadow",
        margin,
        className,
      ])}
      style={style}
    >
      <div
        className={classcat([
          imageSize,
          "ratio flex-shrink-0",
          !image && "bg-gray-lighter",
        ])}
      >
        <svg viewBox={viewBox} />
        {image && (
          <img className="" src={image || "/images/gray-light.png"} alt={alt} />
        )}
      </div>
      {children}
    </Link>
  );
};

export default MediaObject;
