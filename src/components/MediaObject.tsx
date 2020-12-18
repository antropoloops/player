import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  to: string;
  image: string;
  alt: string;
  ratio?: "1:1" | "16:9";
};
const MediaObject: React.FC<Props> = ({
  className = "",
  to,
  alt,
  image,
  children,
  ratio,
}) => {
  const viewBox = ratio === "1:1" ? "0 0 1 1" : "0 0 16 9";
  return (
    <Link
      to={to}
      className={
        className +
        " mt-1 flex w-full text-white min-h-12 overflow-hidden shadow"
      }
    >
      <div
        className={classcat([
          "ratio w-1/3 flex-shrink-0",
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
