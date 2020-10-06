import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  to: string;
  image: string;
  alt: string;
};
const MediaObject: React.FC<Props> = ({
  className = "",
  to,
  alt,
  image,
  children,
}) => (
  <Link
    to={to}
    className={
      className + " mt-1 flex w-full text-white min-h-12 overflow-hidden shadow"
    }
  >
    <div
      className={classcat([
        "ratio w-1/3 flex-shrink-0",
        !image && "bg-gray-lighter",
      ])}
    >
      <svg viewBox="0 0 16 9" />
      {image && <img className="" src={image} alt={alt} />}
    </div>
    {children}
  </Link>
);

export default MediaObject;
